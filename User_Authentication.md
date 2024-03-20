Authentication is the process of verifying the identity of a client. When access control is enabled, MongoDB requires all clients to authenticate themselves in order to determine their access.

Although authentication and authorization are closely connected, authentication is distinct from authorization:

Authentication verifies the identity of a user.

Authorization determines the verified user's access to resources and operations.

- Authentication Mechanisms
- SCRAM Authentication
    Salted Challenge Response Authentication Mechanism (SCRAM) is the default authentication mechanism for MongoDB.When a user authenticates themselves, MongoDB uses SCRAM to verify the supplied user credentials against the user's name, password and authentication database.
    SCRAM is based on the IETF RFC 5802 standard that defines best practices for the implementation of challenge-response mechanisms for authenticating users with passwords.
  Features
    MongoDB's implementation of SCRAM provides:
       - A tunable work factor (the iteration count)
       - Per-user random salts
       - Bi-directional authentication between server and client
    MongoDB supports the following SCRAM mechanisms: SCRAM-SHA-1 , SCRAM-SHA-256
  When you create or update a SCRAM user, you can indicate the SCRAM mechanism to use whether the server or the client 
  digests the password
  When you use SCRAM-SHA-256, MongoDB requires server-side password hashing, which means that the server digests the password.
       

- x.509 Certificate Authentication
- Kerberos Authentication
- LDAP Proxy Authentication
- OpenID Connect Authentication
- Internal / Membership Authentication
