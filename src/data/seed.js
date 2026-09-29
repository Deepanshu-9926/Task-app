import { collectionColors } from '../theme'

function makeTasks(specs) {
  return specs.map(([text, done, due, priority]) => ({
    id: crypto.randomUUID(),
    text,
    done: !!done,
    due: due || null,
    priority: !!priority,
  }))
}

export const seedCollections = [
  {
    id: 'school',
    name: 'School',
    icon: 'book',
    color: collectionColors.pink,
    favourite: true,
    members: 1,
    tasks: makeTasks([
      ['Finish the essay collaboration', false, null, false],
      ['Do the math for next monday', false, 'Today', false],
      ['Read the next chapter of the book', false, null, false],
      ['Send the collaboration files to Jerusha', false, null, true],
      ['Finish the powerpoint presentation', false, null, false],
      ['Submit lab report', true, null, false],
      ['Revise for the quiz', true, null, false],
      ['Group project outline', true, null, false],
    ]),
  },
  {
    id: 'personal',
    name: 'Personal',
    icon: 'person',
    color: collectionColors.teal,
    favourite: true,
    members: 1,
    tasks: makeTasks([
      ['Do the taxes', false, 'Today 18:00', false],
      ['Book dentist appointment', false, null, false],
      ['Call mom', true, null, false],
      ['Renew passport', true, null, false],
      ['Plan weekend trip', true, null, false],
    ]),
  },
  {
    id: 'design',
    name: 'Design',
    icon: 'pencil',
    color: collectionColors.purple,
    favourite: false,
    members: 1,
    tasks: makeTasks([
      ['Prepare dribbble shot', false, 'Today 12:00', false],
      ['Invoice dashboard wireframe', false, 'Today', false],
      ['Explore new icon set', true, null, false],
      ['Update design system colors', true, null, false],
      ['Ship onboarding illustrations', true, null, false],
      ['Review landing page mockup', true, null, false],
    ]),
  },
  {
    id: 'groceries',
    name: 'Groceries',
    icon: 'cart',
    color: collectionColors.gold,
    favourite: false,
    members: 2,
    tasks: makeTasks([
      ['Milk', false, null, false],
      ['Eggs', false, null, false],
      ['Bread', false, null, false],
      ['Coffee beans', false, null, false],
      ['Olive oil', false, null, false],
      ['Rice', false, null, false],
      ['Chicken', false, null, false],
      ['Tomatoes', false, null, false],
      ['Onions', true, null, false],
      ['Pasta', true, null, false],
    ]),
  },
]

export const defaultUser = {
  name: 'Jane Doe',
  email: 'contact@janedoe.com',
  password: 'password123',
  plan: 'Free',
  avatar: null,
}
