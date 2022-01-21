const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// Route to get all tags
router.get('/', (req, res) => {
  // console.log(Tag);
  // find all tags
  Tag.findAll({
    // be sure to include its associated Product data
    include: [{ model: Product }]
  })
    .then((tagData) => res.status(200).json(tagData))
    .catch((err) => res.status(500).json(err))
});

// Route to get tags by its id
router.get('/:id', async (req, res) => {
  try {
    // find a single tag by its `id`
    const tagData = await Tag.findByPk(req.params.id, {
      // be sure to include its associated Product data
      include: [{ model: Product, through: ProductTag }]
    });
    console.log(tagData);
    if (!tagData) {
      res.status(404).json({ message: 'No product found with this id!' });
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }


});

// Route to create tags
router.post('/', async (req, res) => {
  try {
    // create a new tag
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData);

  } catch (err) {
    res.status(400).json(err);
  }

});

// route to update tag by its id
router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((tag) => {
      res.status(200).json(`tag updated ${req.params.id}`);

    })
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err);
    });

});

// route to delete tag by its id
router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });
    if (!tagData) {
      res.status(404).json({ message: `No tag found with this id ${req.params.id}!` });
      return;
    }
    res.status(200).json({ message: `Tags with id ${req.params.id} has been deleted.` });

  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;




