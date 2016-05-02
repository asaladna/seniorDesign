### Controllers

It was easier to handle the button click handlers orthogonally from the sidebar.  The problem was that the previous three.js setup didn't use a module system, and it was going to be alot of additional work to get it integrated with the Webpack that bundled the React.  Ideally the state of the scene would be handled in something like Redux with the React app.

In the end, the React handled only the internal sidebar state (i.e. hovering and drawer sliding), and the controllers I wrote here took care of the on click events that effected the scene.