# Api Endpoint

## Book
| URL | Méthode HTTP | Controller | Method | Info |
|--|--|--|--|--|
| `/book?page=` | `GET` | `Book` | `getIndex` | List books, you change the pages via query parameters |
| `/book/:id` | `GET` | `Book` | `getBook` | One book find by Id |
| `/book/add` | `POST` | `Book` | `postAddBook` | Add book |
| `/book/edit/:id` | `PATCH` | `Book` | `postEditBook` | Edit book by id |
| `/book/delete/:id` | `DELETE` | `Book` | `postDeleteBook` | Delete book by id |
## User
| URL | Méthode HTTP | Controller | Méthode | Info |
|--|--|--|--|--|
| `/auth/signup` | `PUT` | `User` | `postSignup` | Signup route |
| `/auth/login` | `POST` | `User` | `postLogin` | Login route |
