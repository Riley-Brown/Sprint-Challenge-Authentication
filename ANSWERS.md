<!-- Answers to the Short Answer Essay Questions go here -->

1. What is the purpose of using _sessions_?
   Sessions allow the server to generate a cookie to be sent along with a request. This cookie can not be accessed by the browser.

2. What does bcrypt do to help us store passwords in a secure manner.
   brypt will hash a password changing it into encoded characters instead of using the user's actual password. This allows for greater security in the event your database was to be breached.

3. What does bcrypt do to slow down attackers?
   Attackers have to decode the hashed password and this could take a long time depending on how storng the hashed password is.

4. What are the three parts of the JSON Web Token?
   The header, the payload, and the signature.
