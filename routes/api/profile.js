const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const {check, validationResult} = require('express-validator');

const Profile = require('../../models/Profile');
const User = require('../../models/User');

//@route  GET api/profile/me
//@desc   Get current users profile
//@access private
router.get('/me',auth, async (req, res) =>{

    try {
    
        const profile = await Profile.findOne({user : req.user.id}).populate('user',['name','avatar']);

        if (!profile) {
            return res.status(400).json({msg : 'There is no profile for this user'});
        }

        res.json(profile);


    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }


});




//@route  POST api/profile
//@desc   Create or update user profile
//@access private

router.post('/',[auth,[
check('status','Status is required').not().isEmpty(),
check('skills','Skills is required').not().isEmpty()
]], async (req, res) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors : errors.array()});
    }

});



module.exports = router;


