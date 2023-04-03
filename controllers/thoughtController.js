const { User, Thought } = require('../models');

module.exports = {
    // Get route for all thoughts
    getThoughts(req, res) {
        Thought.find()
        .then((thought) => res.json(thought))
        .catch((err) => res.status(500).json(err));
    },

    // Get route for a single thought
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId})
        .select("-__v")
        .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought found with that ID" })
          : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },

    // Post route for creating a new thought
    createThought(req, res) {
        Thought.create(req.body)
        .then((thought) => {
            return User.findOneAndUpdate(
                { _id: req.body.userId },
                { $push: { thoughts: thought._id } },
                { new: true }
            )
        })
        .then((user) =>
        !user
          ? res.status(404).json({
              message: 'Thought created, but found no user with that ID',
            })
          : res.json('Thought created')
          )
          .catch((err) => { 
            console.log(err);
            res.status(500).json(err);
        });
    },

    // Put route for updating a thought
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
        .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that ID' })
          : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },

    // Delete route for deleting a thought and deletes its association to the user
    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
        .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that ID' })
          : User.findOneAndUpdate(
            { thoughts: req.params.thoughtId },
            { $pull: { thoughts: req.params.thoughtId } },
            { new: true }
          )
        )
        .then((user) =>
        !user
          ? res.status(404).json({
            message: 'Thought deleted but no user with this id',
        })
        : res.json({ message: 'Thought deleted' })
        )
        .catch((err) => res.status(500).json(err));
    },

    // Post route for creating a new reaction
    createReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true }
        )
        .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that ID' })
          : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },

    // Delete route for deleting a reaction
    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { runValidators: true, new: true }
        )
        .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that ID' })
          : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    }
}