import { Meteor } from 'meteor/meteor';

import { TasksCollection } from "/imports/db/TasksCollection.js";

import { Accounts } from 'meteor/accounts-base'
import '/imports/api/tasksMethods'

const SEED_USERNAME = 'admin'
const SEED_PASSWORD = 'admin'

const insertTask = (taskText, user) => TasksCollection.insert({
  text: taskText,
  userId: user._id,
  createdAt: new Date(),
})

Meteor.startup(() => {
  if (!Accounts.findUserByUsername(SEED_USERNAME)) {
    Accounts.createUser({
      username: SEED_USERNAME,
      password: SEED_PASSWORD
    })
  }

  const user = Accounts.findUserByUsername(SEED_USERNAME)

  if (TasksCollection.find().count() === 0) {
    [
      'First Task',
      'Second Task',
      'Third Task',
      'Fourth Task',
      'Fifth Task',
      'Sixth Task',
      'Seventh Task'
    ].forEach(taskText => insertTask(taskText, user))
  }
})
