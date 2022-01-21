const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// Route to get all categories in the database
router.get('/', async (req, res) => {
  try {
    // find all categories
    const categoryData = await Category.findAll();
    // be sure to include its associated Products
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }


});

// Route to get categories in the database by id
router.get('/:id', async (req, res) => {
  try {
    // find one category by its `id` value
    const categoryData = await Category.findByPk(req.params.id, {
      // be sure to include its associated Products
      include: [{ model: Product }]
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }


});

// Route to create categories in the database
router.post('/', async (req, res) => {
  try {
    // create a new category
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }

});

// Route to update a category in the database by id
router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
    where: {
      id: req.params.id
    }
  })
    .then(categoryData => {
      if (!categoryData) {
        res.status(400).json(err);
        return;
      }
      res.json(categoryData);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});


// Route to delete a category in the database by id
router.delete('/:id', async (req, res) => {
  try {
    // delete a category by its `id` value
    const categoryData = await Category.destroy({
      where: { id: req.params.id }
    });
    if (!categoryData) {
      res.status(404).json({ message: `No category found with this id ${req.params.id}!` });
      return;
    }
    res.status(200).json({ message: `Category with id ${req.params.id} has been deleted.` });
  } catch (err) {
    res.status(500).json(err);
  }

});

module.exports = router;
