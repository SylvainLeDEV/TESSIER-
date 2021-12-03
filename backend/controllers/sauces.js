const Sauce = require('../models/sauces');
const fs = require('fs');
const {likeSauce} = require("./sauces");

exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    const sauce = new Sauce({
        ...sauceObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        likes: 0,
        dislikes: 0,
        usersLiked: [],
        usersDisliked: [],

    });
    sauce.save().then(
        () => {
            res.status(201).json({
                message: 'Post saved successfully!'
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
};

exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({_id: req.params.id})
        .then((sauce) => {
                res.status(200).json(sauce);
                console.log(sauce)
            }
        )
        .catch((error) => {
                res.status(404).json({
                    error: error
                });
            }
        );
};

// exports.modifySauce = (req, res, next) => {
//     const filename = sauce.imageUrl.split('/images/')[1];
//     fs.unlink(`images/${filename}`, () => {
//
//     });
//     const sauceObject = req.file ?
//         {
//             ...JSON.parse(req.body.sauce),
//             imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
//         } : {...req.body}
//     Sauce.updateOne({_id: req.params.id}, {...sauceObject, _id: req.params.id})
//         .then(() => {
//                 res.status(201).json({
//                     message: 'Sauce updated successfully!'
//                 });
//             }
//         ).catch(
//         (error) => {
//             res.status(400).json({
//                 error: error
//             });
//         }
//     );
// };

exports.modifySauce = (req, res, next) => {
    Sauce.findOne({_id: req.params.id})
        .then((sauce) => {
            const filename = sauce.imageUrl.split('/images/')[1];

            if (req.file) {
                fs.unlink(`images/${filename}`, () => {
                });
                const sauceObject = {
                    ...JSON.parse(req.body.sauce),
                    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
                }
                Sauce.updateOne({_id: req.params.id}, {...sauceObject, _id: req.params.id})
                    .then(() => {
                        res.status(201).json({message: 'Sauce updated successfully!'})
                    })
                    .catch((error) => {
                        res.status(400).json({error: error})
                    });
            } else {
                const sauceObject = {...req.body}

                Sauce.updateOne({_id: req.params.id}, {...sauceObject, _id: req.params.id})
                    .then(() => {
                        res.status(201).json({message: 'Sauce modifié !'})
                    })
                    .catch((error) => {
                        res.status(400).json({error: error})
                    });
            }
        })
}

exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({_id: req.params.id})
        .then((sauce) => {
            const filename = sauce.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                Sauce.deleteOne({_id: req.params.id})
                    .then(() => {
                        res.status(200).json({
                            message: 'Supprimer !'
                        });
                    })
                    .catch((error) => {
                        res.status(400).json({
                            error: error
                        })
                    })
            });
        })
        .catch(error => res.status(500).json({error}));
};

exports.getAllSauce = (req, res, next) => {
    Sauce.find().then(
        (sauces) => {
            res.status(200).json(sauces);
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
};

exports.likeSauce = (req, res, next) => {
    Sauce.findOne({_id: req.params.id})
        .then((sauce) => {
            const likeDislikeUser = req.body.userId;

            const userLiked = sauce.usersLiked;
            const userDisliked = sauce.usersDisliked;

            if (req.body.like === 1) {
                userLiked.push(likeDislikeUser)
                sauce.likes = userLiked.length
            }
            if (req.body.like === 0) {
                //     const userId = req.body.userId
                //     let indexLike;
                //     let indexDislike;
                //     const findUserIdLiked = userLiked.find((userIdinUserLiked, i) => {
                //         if (userId === userIdinUserLiked) indexLike = i;
                //         return userId === userIdinUserLiked;
                //     });
                //     const findUserIdDisliked = userDisliked.find((userIdinUserdisLiked, i) => {
                //         if (userId === userIdinUserdisLiked) indexDislike = i;
                //         return userId === userIdinUserdisLiked;
                //     });
                //     console.log("find userId:", findUserIdDisliked)
                //     if (findUserIdLiked) {
                //         userLiked.splice(indexLike, 1);
                //         sauce.likes = userLiked.length
                //     }
                //     if (findUserIdDisliked) {
                //         userDisliked.splice(indexDislike, 1);
                //         sauce.dislikes = userDisliked.length
                //     }
                // }

                if (userLiked.includes(req.body.userId)) {
                    for (let i = 0; i < userLiked.length; i++) {
                        if (userLiked[i] === req.body.userId) {
                            userLiked.splice(i, 1)
                        }
                    }
                }
                if (userDisliked.includes(req.body.userId)) {
                    for (let i = 0; i < userDisliked.length; i++) {
                        if (userDisliked[i] === req.body.userId) {
                            userDisliked.splice(i, 1)
                        }
                    }
                }
            }
            sauce.likes = userLiked.length
            sauce.dislikes = userDisliked.length

            if (req.body.like === -1) {
                userDisliked.push(likeDislikeUser);
                sauce.dislikes = userDisliked.length
            }


            console.log("UserId", likeDislikeUser)
            console.log("userLike :", sauce.usersLiked)
            console.log("userDislike :", userDisliked)
            sauce.save()
                .then(() => res.status(200).json({message: "Like ou Dislike ajouté !"}))
                .catch((error) => res.status(400).json({error}));

        })
        .catch((error) => {
            res.status(400).json({
                error: error
            });
        })

};

