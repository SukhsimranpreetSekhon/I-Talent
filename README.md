<img src="services/frontend/src/assets/I-talent-logo-light.png" alt="I-Talent Logo" width="270" />

[![DEV Deployment](https://img.shields.io/badge/Access%20Application-DEV-gray?logo=react&logoColor=white&style=for-the-badge&labelColor=green)](http://italent-development.apps.dev.ocp-dev.ised-isde.canada.ca/)
[![UAT Deployment](https://img.shields.io/badge/Access%20Application-UAT-gray?logo=react&logoColor=white&style=for-the-badge&labelColor=green)](http://italent-uat.apps.dev.ocp-dev.ised-isde.canada.ca/)
[![SonarQube Frontend](https://img.shields.io/badge/SonarQube-Frontend-blue?logo=sonarqube&logoColor=white&style=for-the-badge)](https://sonarqube-ised-ci.apps.dev.ocp-dev.ised-isde.canada.ca/dashboard?id=ITalent-frontend)
[![SonarQube Backend](https://img.shields.io/badge/SonarQube-Backend-blue?logo=sonarqube&logoColor=white&style=for-the-badge)](https://sonarqube-ised-ci.apps.dev.ocp-dev.ised-isde.canada.ca/dashboard?id=ITalent-backend)
[![Jenkins](https://img.shields.io/badge/Jenkins-gray?logo=jenkins&logoColor=white&style=for-the-badge)](https://cicd.ised-isde.canada.ca/job/DSD/job/I-Talent/job/I-Talent/)
[![DEV OpenShift](https://img.shields.io/badge/OpenShift%20Management-DEV-gray?logo=red-hat-open-shift&style=for-the-badge&labelColor=red)](https://console-openshift-console.apps.dev.ocp-dev.ised-isde.canada.ca/topology/ns/italent-development/graph)
[![UAT OpenShift](https://img.shields.io/badge/OpenShift%20Management-UAT-gray?logo=red-hat-open-shift&style=for-the-badge&labelColor=red)](https://console-openshift-console.apps.dev.ocp-dev.ised-isde.canada.ca/topology/ns/mytalent/graph)

An improved directory and employee search tool.

I-Talent is an internal web-application that would enable employees to share information about their employment status, job position, skills, and credentials. ISED employees can login to I-Talent with their windows credentials, where they can create a profile or search for employees with the right expertise, education, competencies, experience and other essential qualifications at any time for talent management, staffing, succession planning, or simply for insight on a project or file.

# Getting started

You'll need to create three files to define the environment variables, one at the root of the project and two in the `env` folder. To get those variables, ask the current developers.

[Docker](https://www.docker.com/) and [Visual Studio Code](https://code.visualstudio.com/) are technically optional tools for development, but are highly recommended! A list of useful Visual Studio Code extensions are listed [here](https://github.com/CDH-Studio/I-Talent/wiki/Tech-stack#useful-visual-studio-code-extensions).

In the root of the project, to start developing the application use the [Docker Visual Studio Code extension](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-docker) or run the following command:

## Downloading and Configuring Dependencies

Download "Visual Studio Code" for Windows
Run the installer
Once installed open Visual Studio Code
Go to the Extensions icon (or press Ctrl+Shift+X)
Install "Prettier", and "Docker"

Download "Docker Desktop" for Windows
Run the "Docker Desktop Installer"
On configuration screen press "Ok"
Once it finishes "Unpacking files..." and "Installing..." it should say the "Installation succeeded"
Press on "Close and restart" (Note: This will restart Windows)

After Restart, open Docker
Click on the Settings icon in the top pane
In "Resources -> PROXIES" enter the proxy information found here: https://asbscr.ic.gc.ca/scm/projects/CIODD/repos/cio-developer-handbook/browse/chapters/01-local-workstation-setup.md#docker
It should look like the following:

![image](https://user-images.githubusercontent.com/47506745/103776084-f1157400-4ffc-11eb-8aa1-3b895846fa0a.png)

Download "Git" for windows
Run the Git installer
Accept all of the default settings the installer provides
Once the installation is complete open a command prompt window
In command prompt enter: git --version
Ensure that a Git version is displayed following the command, if not, follow this guide to add Git to the path https://asbscr.ic.gc.ca/scm/projects/CIODD/repos/cio-developer-handbook/browse/chapters/01-local-workstation-setup.md#docker

Set up Git User:
Enter the following commands into the command prompt:
`git config --global user.name "your-username"`
`git config --global user.email "your-email"`

Where your-username is your Git user name and your-email is your Git email. (Note: As shown, surround your user name and email in double quotes)

Set up Git Proxy:
Enter the following commands into the command prompt:
`git config --global http.proxy http://proxyUsername:proxyPassword@proxy.server.com:port`
Following "http.proxy" in the command, the proxy I used for the ISED is http://cdhwg01.prod.prv:80.
Ex. `git config --global http.proxy http://cdhwg01.prod.prv:80`

## Git -- I-Talent setup

Clone the Git Repository:
`git clone https://github.com/CDH-Studio/I-Talent.git`
Change into the Git Directory in your command prompt:
`cd I-Talent`
Identify the branch:
`git status`
Output:

```
On branch development
Your branch is up to date with 'origin/development'.

nothing to commit, working tree clean
```

Type: `code . `
This will open Visual Studio Code for the I-Talent repository we just cloned

## I-Talent Environment Setup

Set-up the three files for the environment by asking the developers

## Optional (For Image Devices Only)

In the "services" -> "backend" folder locate the "Dockerfile.local" and before line 13 (`RUN yarn install`) insert the following:

```
RUN yarn config set proxy http://cdhwg01.prod.prv:80
RUN yarn config set https-proxy http://cdhwg01.prod.prv:80
```

In the "services" -> "frontend" folder locate the "Dockerfile.local" and before line 13 (`RUN yarn install`) insert the following:

```
RUN yarn config set proxy http://cdhwg01.prod.prv:80
RUN yarn config set https-proxy http://cdhwg01.prod.prv:80
```

## Docker Compose In VS Code

In the I-Talent folder locate the "docker-compose.yml" file
Right click that file and select "Compose Up"

If everything worked in composing, it will say "Successfully built x" for both the frontend (might have to scroll back to see this)

## Docker Compose Without VS Code

In the root of the project, to start developing the application use the [Docker Visual Studio Code extension](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-docker) or run the following command:

```bash
docker-compose up
```

You can now access different components of the web application:

- [localhost:3000](http://localhost:3000) - Application
- [localhost:5555](http://localhost:5555) - Prisma studio, database visualizer/editer
- [localhost:3031](http://localhost:3031) - Webpack analyzer (need to run `yarn analyze` in the frontend docker container)
- [localhost:8080](http://localhost:8080) - API endpoints
- [localhost:8080/api-docs](http://localhost:8080/api-docs) - API endpoints documentation
- [localhost:5432](http://localhost:5432) - PostgreSQL database

> Note: Internet connection is required to run the application unless you setup keycloak locally with the steps described in the [wiki](https://github.com/CDH-Studio/I-Talent/wiki/Local-Keycloak-setup)

Visit backend [README](services/backend/README.md) and the frontend [README](services/frontend/README.md) for more information.

# Wiki

Visit the [Wiki](https://github.com/CDH-Studio/UpSkill/wiki) has more information about our tech stack, OpenShift project management and templating, Postman API testing setup, and local Keycloak setup.

# Contributors

Our full stack developers

| **Active developers**                                             | **Previous developers**                                           |
| ----------------------------------------------------------------- | ----------------------------------------------------------------- |
| [Ali Nouri](https://www.linkedin.com/in/a-nouri/)                 | [Trevor Bivi](https://www.linkedin.com/in/trevor-bivi-736181193/) |
| [Benoît Jeaurond](https://www.linkedin.com/in/benoit-jeaurond/)   | [Kate Thornley](https://www.linkedin.com/in/kate-a-w-thornley/)   |
| [Mohamed Radwan](https://www.linkedin.com/in/mo-radwan/)          | [Rizvi Rab](https://www.linkedin.com/in/rizvi-rab-370327160/)     |
| [Mamadou Bah](https://www.linkedin.com/in/mamadou-bah-9962a711b/) | [Sagal Maxamud](https://www.linkedin.com/in/s-glmxmd/)            |

| [Sukhsimranpreet Sekhon](https://www.linkedin.com/in/sukhusekhon/)

# Contributing

Want to contribute to this project? Take a look at our [Wiki](https://github.com/CDH-Studio/UpSkill/wiki) and [CONTRIBUTING](CONTRIBUTING.md) file to start!

# Contact

This application is developped by students at [CDH Studio](https://cdhstudio.ca/)
