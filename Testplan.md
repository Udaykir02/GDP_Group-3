# Test Plan 

## [Storegrab]

## Last Updated: [05/02/2024]

-----

### Introduction

This test plan outlines the strategy for testing an Ecommerce App developed with React Native, serving both Android and iOS platforms. With a focus on vendor, user, and product management functionalities, our testing ensures reliability and user-friendliness, omitting third-party integrations. By meticulously planning tests, we aim to ensure the app's functionality, performance, and usability across diverse scenarios, delivering a robust user experience.

**Purpose of the Document:** 

This document serves as a comprehensive guide for the testing team to validate the core functionalities and features of the Ecommerce App, guaranteeing its reliability, security, and user-friendliness. 

**Summary of Goals:**

**The primary goals of this test plan include:**

- Verification of authentication mechanisms for user registration and login processes, including testing API endpoints for secure user authentication.
- Validation of password recovery functionality to ensure seamless user access, including thorough testing of relevant API endpoints.
- Testing product listing functionality to ensure accurate display and categorization, with a focus on validating API endpoints for fetching and displaying product information.
- Evaluation of vendor management features, including product upload and inventory management, with comprehensive testing of corresponding API endpoints.

**Constraints:**

Restricted resources could influence the depth and breadth of testing, leading to a concentration on prioritizing essential features for comprehensive scrutiny.

### References

* [Project description](https://github.com/varunrachakatla/GDP_Group-3/wiki/Project-Information)

* [Summary](https://github.com/varunrachakatla/GDP_Group-3/wiki/Project-Charter#brief-summary-of-the-problem)

* [Charter](https://github.com/varunrachakatla/GDP_Group-3/wiki/Project-Charter)

* [Functional Requirements Documentation](https://github.com/varunrachakatla/GDP_Group-3/wiki/Functional-Requirements-List)

### Features 

#### To be tested

| Feature description | List of Functional Requirements | 
| ------------------- | ---------------------- |
| Login | 
| | The system **SHALL** authenticate user credentials. (FR 1) |
| | The system **SHALL** encrypt and securely store user passwords. (FR 2) |
| | The system **SHALL** facilitate users in resetting their passwords through a secure and robust procedure. (FR 4) |
| HomePage | 
| | The system **SHALL** provide butter smooth navigation flow. (FR 8) |
| | The system **SHALL** offer wide varieties of products. (FR 20) |
| | The system **SHALL** allow users to add required products to the cart. (FR 17) |
| Vendor List | 
| | The system **SHALL** provide a list of local shop vendors. (FR 6) |
| | The system **SHALL** provide a user interface for specific and user-selected vendor products and their services. (FR 7) |
| | The system **SHALL** include Map Routing Mechanism. (FR 11) |

#### Not to be tested
 
 
| Feature description | List of functional requirements | Rationale |
| ------------------- | ------------------------------- | --------- |
| Maps API | FR 12 | Testing for the Google Maps API isn't typically necessary due to its robustness and widespread usage, backed by rigorous internal testing by Google. |
| Stripe Payments API | FR 16 | Testing for the Stripe Payments API is typically not required because Stripe provides a robust suite of pre-configured testing tools and environments, such as their sandbox mode, which allows developers to simulate transactions without affecting live data
| Algolia Search API | FR 20 | Testing for the Algolia Search API may not be necessary because Algolia provides its own robust testing infrastructure, ensuring reliability and accuracy of search results. Additionally, given Algolia's extensive documentation and straightforward integration process, developers can confidently rely on the API without the need for extensive manual testing |

### Approach

#### Tools

Unit Testing (Jest)

Black box Testing(Generating Testcases)

#### Methods  

User Interface (UI) Testing

Integration Testing

User Acceptance Testing (UAT)

### Test Deliverables:

#### Login

| Requirement | Test Case Description | Test Type | Person Responsible | Completed |
| ----------- | --------------------- | --------- | ------------------ | --------- |
| FR 1        | System authenticates user credentials | Unit (Jest) | Varun Raj | In Progress |
| FR 2        | System securely stores user passwords | Unit (Jest) | Uday | In Progress |
| FR 4        | System facilitates password reset securely | Unit (Jest) | Nikith | In Progress |

#### HomePage

| Requirement | Test Case Description | Test Type | Person Responsible | Completed |
| ----------- | --------------------- | --------- | ------------------ | --------- |
| FR 8        | System provides smooth navigation flow | Unit (Jest) | Srikanth | In Progress |
| FR 20       | System offers wide variety of products | Unit (Jest) | Sai Krishna | In Progress |
| FR 17       | System allows addition of products to cart | Unit (Jest) | Mahesh | In Progress |

#### Vendor List

| Requirement | Test Case Description | Test Type | Person Responsible | Completed |
| ----------- | --------------------- | --------- | ------------------ | --------- |
| FR 6        | System provides list of local shop vendors | Unit (Jest) | Varun Raj | In Progress |
| FR 7        | System offers user interface for vendor products | Unit (Jest) | Uday | In Progress |
| FR 11       | System includes Map Routing Mechanism | Unit (Jest) | Nikith | In Progress |

