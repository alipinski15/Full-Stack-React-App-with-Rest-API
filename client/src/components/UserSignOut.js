import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';

/**
 * Signs a user out when the signout button is selected. Redirects user to
 * the Courses(index) page.
 */

export default ({ context }) => {
  useEffect(() =>context.actions.signOut());
  return (
    <Redirect to="/" />
  );
}
