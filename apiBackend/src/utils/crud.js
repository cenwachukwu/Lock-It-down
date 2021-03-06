// read one note by authenticated user
export const getOne = model => async (req, res) => {
  try {
    const doc = await model
      .findOne({ createdBy: req.user._id, _id: req.params.id })
      .lean()
      .exec();

    if (!doc) {
      return res.status(400).end();
    }

    res.status(200).json({ data: doc });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

// geting all notes by authenticated user
export const getMany = model => async (req, res) => {
  try {
    const docs = await model
      .find({ createdBy: req.user._id })
      .lean()
      .exec();

    res.status(200).json({ data: docs });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

// allowing authenticated user to create notes
export const createOne = model => async (req, res) => {
  const createdBy = req.user._id;
  try {
    const doc = await model.create({ ...req.body, createdBy });
    res.status(201).json({ data: doc });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

// allowing authenticated user to update notes
export const updateOne = model => async (req, res) => {
  try {
    const updatedDoc = await model
      // we use findOneAndUpdate b/c we have two params we are finding by
      .findOneAndUpdate(
        {
          createdBy: req.user._id,
          _id: req.params.id
        },
        req.body,
        { new: true }
      )
      .lean()
      .exec();

    if (!updatedDoc) {
      return res.status(400).end();
    }

    res.status(200).json({ data: updatedDoc });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

// allowing authenticated user to remove notes
export const removeOne = model => async (req, res) => {
  try {
    await model.findOneAndRemove({
      createdBy: req.user._id,
      _id: req.params.id
    });

    return res.status(200).json({ data: "Your note has been deleted" });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

// now we'll export all of them
export const crudControllers = model => ({
  removeOne: removeOne(model),
  updateOne: updateOne(model),
  getMany: getMany(model),
  getOne: getOne(model),
  createOne: createOne(model)
});
