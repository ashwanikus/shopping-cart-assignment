module.exports = {
  inputs: [
    { label: 'Full Name', type: 'text', id: 'full-name' },
    { label: 'Last Name', type: 'text', id: 'last-name' },
    { label: 'Email', type: 'email', id: 'email' },
    { label: 'Password', type: 'password', id: 'password' },
    { label: 'Confirm Password', type: 'password', id: 'confirm-password' }
  ],
  submitLabel: 'Signup',
  primaryHeading: 'Signup',
  primarySubHeading: 'We do not share you personal detail with anyone.',
  submitLink: '/SignIn',
  cart: null
};
