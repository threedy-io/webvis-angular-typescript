# Description

webvis-angular is a simple application that shows how to integrate webvis into the modern framework Angular.

---

## Table of content

---

- [Description:](#description)
- [Table of content:](#table-of-content)
- [How to use the example](#how-to-use-the-example)
- [Technical details](#technical-details)
- [License](#license)
- [How to report an issue](#how-to-report-an-issue)

---

## How to use the example

This sample example is based on [webvis API](https://docs.threedy.io/3.6.1/index.html) and the [Angular documentation](https://angular.io/start).

- Setup

  In the project directory, run:

  - `npm install`

    - To install all the dependencies.

  - `npm start`

        - to build a development build of the demonstator app and start a development webserver. It watches for changes on    the demonstrator project and hot reloads the app.
        - Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

  - `ng build webvis-angular-lib`

        - To build the webvis library : Please note that it should be build beforehand.

## Technical details

### Env variables

- `THREEDY_WEBVIS_URL` : Link to the webvis instance where webvis.js is located. Change this to your own instance location in `environment.ts`. The latest version is 3.7. [https://demo.threedy.io/repo/webvis/webvis.js?next](https://demo.threedy.io/repo/webvis/webvis.js?next)

## License

This sample is licensed under the terms of the MIT License. Please see the LICENSE file for full details.

## How to report an issue

For any report please [contact us](https://i3dhub.atlassian.net/servicedesk/customer/portal/2).
