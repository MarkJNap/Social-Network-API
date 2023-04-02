const { User, Thought } = require('../models');

// ** Must haves **
// Get route for all users ✅
// Get route for single user (by its _id and populated thought and friend data) ✅
// Create user route ✅ 
// Update user route (by its _id) ✅
// Delete user route (by its _id) ✅
// ----------------------------------------------------------------
// TODO: Might be done needs testing
// **BONUS**: Remove a user's associated thoughts when deleted.
// ----------------------------------------------------------------

module.exports = {
    // Get route for all users 
    getUsers(req, res) {
        User.find()
        .then((users) => res.json(users))
        .catch((err) => res.status(500).json(err));
    },

    // Gets route for a single users data and populates their friends and thoughts data
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId})
        .select("-__v")
        .populate("thoughts")
        .populate("friends")
        .then((user) =>
          !user
            ? res.status(404).json({ message: 'No user with that ID' })
            : res.json(user)
        )
        .catch((err) => res.status(500).json(err))
    },

    // Post route for creating a new user
    createUser(req, res) {
        User.create(req.body)
        .then((user) => res.json(user))
        .catch((err) => res.status(500).json(err));
    },

    // Put route for updating a user
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
        .then((user) =>
          !user
            ? res.status(404).json({ message: 'No user with that ID' })
            : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },

    // Delete route for deleting a user and the thoughts they have made
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
        .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : Thought.deleteMany({ _id: { $in: user.thoughts } })
      )
      .then(() => res.json({ message: 'User and their thoughts deleted!' }))
      .catch((err) => res.status(500).json(err));
    },

    // Post route for adding a friend to the user
    addFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId } },
            { runValidators: true, new: true }
        )
        .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },

    // Delete route for removing a friend from the user
    deleteFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { runValidators: true, new: true }
        )
        .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    }
}