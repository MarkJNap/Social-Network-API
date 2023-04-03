const router = require("express").Router();

const {
    getThoughts,
    createThought,
    getSingleThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction
} = require("../../controllers/thoughtController");

// Api routes for /api/thoughts
router.route("/").get(getThoughts).post(createThought);

// Api routes for /api/thoughts/:thoughtId
router.route("/:thoughtId").get(getSingleThought).put(updateThought).delete(deleteThought)

// Api routes for /api/thoughts/:thoughtId/reactions
router.route("/:thoughtId/reactions").post(createReaction)

// Api routes for /api/thoughts/:thoughtId/reactions/:reactionId
router.route("/:thoughtId/reactions/:reactionId").delete(deleteReaction)

module.exports = router;
