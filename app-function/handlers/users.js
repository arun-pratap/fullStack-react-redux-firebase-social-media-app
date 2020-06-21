const firebase = require('firebase')
const { db, admin } = require('../util/dbAdmin')

const { config } = require('../util/config')
firebase.initializeApp(config)

const {
    validateSignupData, validateLoginData, reduceUserDetails
} = require('../util/validation')

//signUpUser
exports.signup = (req, res) => {
    const newUser = {
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
        handle: req.body.handle
    }

    const { errors, valid } = validateSignupData(newUser)
    if (!valid) return res.status(400).json(errors)

    const noImg = 'no-imf.png'
    let token, userId
    db.doc(`/users/${newUser.handle}`)
        .get()
        .then(doc => {
            if (doc.exists) {
                return res.status(400).json({ handle: 'this handle is alreadty taken' })
            } else {
                return firebase.auth()
                    .createUserWithEmailAndPassword(newUser.email, newUser.password)
            }
        })
        .then(data => {
            userId = data.user.uid
            return data.user.getIdToken()
        })
        .then(tokenid => {
            token = tokenid
            const userCredentials = {
                handle: newUser.handle,
                email: newUser.email,
                createdAt: new Date().toISOString(),
                imageUrl: `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${noImg}?alt=media`,
                userId
            }
            db.doc(`/users/${newUser.handle}`)
                .set(userCredentials)
        })
        .then(() => {
            return res.status(201).json({ token })
        })
        .catch(err => {
            console.error(err);
            if (err.code === 'auth/email-already-in-use') {
                return res.status(400)
                    .json({ email: 'Email is already is use' })
            } else {
                return res.status(500)
                    .json({ general: 'Something went wrong' })
            }
        })
}

//loginUser
exports.login = (req, res) => {
    const user = {
        email: req.body.email,
        password: req.body.password
    }

    const { errors, valid } = validateLoginData(user)
    if (!valid) return res.status(400).json(errors)

    firebase.auth()
        .signInWithEmailAndPassword(user.email, user.password)
        .then(data => {
            return data.user.getIdToken()
        })
        .then(token => {
            return res.json({ token })
        })
        .catch(err => {
            console.error(err)
            // auth/wrong-password
            // auth/user-not-user
            return res.status(403)
                .json({ general: 'Wrong credentials, Please try again' })
        })
}

//addUserDetails
exports.addUserDetails = (req, res) => {
    let userDetails = reduceUserDetails(req.body)
    db.doc(`/users/${req.user.handle}`)
        .update(userDetails)
        .then(() => {
            return res.json({ message: 'Details added successfully' })
        })
        .catch(err => {
            console.error(err)
            return res.status(500).json({ error: err.code })
        })
}

//getAnyUserDetails
exports.getAnyUserDetails = (req, res) => {
    let userData = {}
    db.doc(`/users/${req.params.handle}`)
        .get()
        .then((doc) => {
            if (doc.exists) {
                userData.user = doc.data()
                return db
                    .collection("screams")
                    .where("userHandle", "==", req.params.handle)
                    .orderBy("createdAt", "desc")
                    .get()
            } else {
                return res.status(404).json({ errror: "User not found" })
            }
        })
        .then((data) => {
            console.log(admin.storage())
            userData.screams = []
            data.forEach((doc) => {
                userData.screams.push({
                    body: doc.data().body,
                    createdAt: doc.data().createdAt,
                    userHandle: doc.data().userHandle,
                    userImage: doc.data().userImage,
                    likeCount: doc.data().likeCount,
                    commentCount: doc.data().commentCount,
                    screamId: doc.id,
                })
            })
            return res.json(userData)
        })
        .catch((err) => {
            console.error(err)
            return res.status(500).json({ error: err.code })
        })
}

// ownUserDetails
exports.getAuthenticatedUser = (req, res) => {
    let userData = {}
    db.doc(`/users/${req.user.handle}`)
        .get()
        .then(doc => {
            if (doc.exists) {
                userData.credentials = doc.data()
                return db.collection('likes')
                    .where('userHandle', '==', req.user.handle)
                    .get()
            }
        })
        .then(data => {
            userData.likes = []
            data.forEach(doc => {
                userData.likes.push(doc.data())
            })
            return db.collection("notifications")
                .where("recipient", "==", req.user.handle)
                .orderBy("createdAt", "desc")
                .limit(10)
                .get()
        })
        .then((data) => {
            userData.notifications = [];
            data.forEach((doc) => {
                userData.notifications.push({
                    recipient: doc.data().recipient,
                    sender: doc.data().sender,
                    createdAt: doc.data().createdAt,
                    screamId: doc.data().screamId,
                    type: doc.data().type,
                    read: doc.data().read,
                    notificationId: doc.id,
                });
            });
            return res.json(userData);
        })
        .catch(err => {
            console.error(err)
            return res.status(500).json({ error: err.code })
        })
}

// uploadImage
exports.uploadImage = (req, res) => {
    const BusBoy = require('busboy')
    const os = require('os')
    const fs = require('fs')
    const path = require('path')

    const busboy = new BusBoy({ headers: req.headers })

    let imageToBeUploaded = {}
    let imageFileName
    busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
        if (mimetype !== 'image/jpeg' && mimetype !== 'image/png') {
            return res.status(400).json({ error: 'Wrong file type submitted' })
        }
        let imageExtension = filename.split('.')[filename.split('.').length - 1]
        imageFileName = `${Math.round(Math.random() * 1000000000000000).toString()}.${imageExtension}`
        let filePath = path.join(os.tmpdir(), imageFileName)
        imageToBeUploaded = { filePath, mimetype }
        file.pipe(fs.createWriteStream(filePath))
    })
    busboy.on('finish', () => {
        admin.storage()
            .bucket()
            .upload(imageToBeUploaded.filePath)
            .then(() => {
                const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${imageFileName}?alt=media`
                return db.doc(`/users/${req.user.handle}`).update({ imageUrl })
            })
            .then(() => {
                return res.json({ message: 'Image uloaded successfully' })
            })
            .catch(err => {
                console.error(err)
                return res.status(500).json({ error: err.code })
            })
    })
    busboy.end(req.rawBody)
}

// markAsRead
exports.markNotificationsRead = (req, res) => {
    let batch = db.batch()
    req.body.forEach((notificationId) => {
        const notification = db.doc(`/notifications/${notificationId}`)
        batch.update(notification, { read: true })
    })
    batch.commit()
        .then(() => {
            return res.json({ message: "Notifications marked read" })
        })
        .catch((err) => {
            console.error(err)
            return res.status(500).json({ error: err.code })
        })
}
