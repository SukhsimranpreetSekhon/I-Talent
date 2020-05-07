const moment = require("moment");
const Models = require("../../models");
const Profile = Models.profile;

const getProfile = async (response) => {
  response.status(200).json(await Profile.findAll());
};

// Get the Profile's education history and format the result
const getEducationHelper = async (profile) => {
  let education = await profile.getEducation({
    order: [["startDate", "DESC"]],
  });
  return Promise.all(
    education.map(async (educ) => {
      let startDate = moment(educ.startDate);
      let endDate = moment(educ.endDate);
      let school = await educ.getSchool().then((res) => {
        if (res) return res.dataValues;
      });
      let diploma = await educ.getDiploma().then((res) => {
        if (res) return res.dataValues;
      });
      educ = educ.dataValues;

      return {
        school: {
          id: school.id,
          description: { en: school.description, fr: school.description },
        },
        diploma: {
          id: diploma.id,
          description: {
            en: diploma.descriptionEn,
            fr: diploma.descriptionFr,
          },
        },
        content: "",
        startDate: { en: startDate, fr: startDate },
        endDate: { en: endDate, fr: endDate },
      };
    })
  );
};

// Get the Profile's experience history and format the result
const getExperiencesHelper = async (profile) => {
  let experiences = await profile.getExperiences({
    order: [["startDate", "DESC"]],
  });
  return (careerSummary = experiences.map((experience) => {
    let startDate = moment(experience.startDate);
    let endDate = moment(experience.endDate);

    return {
      subheader: experience.organization,
      header: experience.jobTitle,
      content: experience.description,
      startDate: startDate,
      endDate: endDate,
    };
  }));
};

// Get user profile using profile ID
const getPublicProfileById = async (request, response) => {
  const id = request.params.id;

  // get user profile
  let profile = await Profile.findOne({ where: { id: id } });
  if (!profile) {
    return response.status(404).json({
      status: "API Query Error",
      message: "User profile with the provided ID not found",
    });
  }

  // get user info based on profile
  let user = await profile.getUser();
  if (!user) {
    return response.status(404).json({
      status: "API Query Error",
      message: "User with the provided ID not found",
    });
  }

  // merge info from profile and user
  let data = { ...profile.dataValues, ...user.dataValues };

  // Get User Tenure (may be empty)
  let tenure = await profile.getTenure({ raw: true });

  // Get Career Mobility (may be empty)
  let careerMobility = await profile.getCareerMobility({ raw: true });

  // Get Talent Matrix (may be empty)
  let talentMatrixResult = await profile.getTalentMatrixResult({ raw: true });

  // Get Group Level (may be empty)
  let groupLevel = await profile.getGroupLevel({ raw: true });

  // Get Security Clearance (may be empty)
  let securityClearance = await profile.getSecurityClearance({ raw: true });

  // Get Acting Position (may be empty)
  let acting = await profile.getActing({ raw: true });

  // Get Location (may be empty)
  let location = await profile.getLocation({ raw: true });

  // Get Experience (may be empty)
  let careerSummary = await getExperiencesHelper(profile);

  // Get Projects (may be empty)
  let dbProjects = await profile.getProfileProjects();
  let projects = dbProjects.map((project) => {
    return { text: project.description };
  });

  // Get Education (may be empty)
  let educArray = await getEducationHelper(profile);

  let organizationList = await profile
    .getProfileOrganizations({ order: [["tier", "ASC"]] })
    .then((organizations) => {
      let orgList = organizations.map((organization) => {
        return {
          en: organization.descriptionEn,
          fr: organization.descriptionFr,
        };
      });
      return orgList;
    });

  let skills = await profile.getSkills().map(async (skill) => {
    if (skill) {
      let cats = await skill.getCategory({
        attributes: ["descriptionEn", "descriptionFr", "id"],
        require: true,
      });
      return {
        id: skill.dataValues.id,
        description: {
          en: skill.dataValues.descriptionEn,
          fr: skill.dataValues.descriptionFr,
          category: {
            en: cats.dataValues.descriptionEn,
            fr: cats.dataValues.descriptionFr,
          },
          categoryId: skill.dataValues.categoryId,
        },
      };
    }
  });

  let mentorshipSkills = await profile
    .getMentorshipSkills()
    .map(async (mentorshipSkill) => {
      if (mentorshipSkill) {
        let cats = await mentorshipSkill.getCategory({
          attributes: ["descriptionEn", "descriptionFr", "id"],
          require: true,
        });
        return {
          id: mentorshipSkill.dataValues.id,
          description: {
            en: mentorshipSkill.dataValues.descriptionEn,
            fr: mentorshipSkill.dataValues.descriptionFr,
            category: {
              en: cats.dataValues.descriptionEn,
              fr: cats.dataValues.descriptionFr,
            },
            categoryId: mentorshipSkill.dataValues.categoryId,
          },
        };
      }
    });

  let competencies = await profile.getCompetencies().map((competency) => {
    if (competency)
      return {
        id: competency.dataValues.id,
        description: {
          en: competency.dataValues.descriptionEn,
          fr: competency.dataValues.descriptionFr,
        },
      };
  });

  let developmentalGoals = await profile.getDevelopmentGoals().map((goal) => {
    if (goal)
      return {
        id: goal.dataValues.id,
        description: {
          en: goal.dataValues.descriptionEn,
          fr: goal.dataValues.descriptionFr,
        },
      };
  });

  let secLangProf = await profile.getSecondLanguageProficiency().then((res) => {
    if (res) return res.dataValues;
  });

  let relocationLocations = await profile
    .getRelocationLocations()
    .then((relocs) =>
      Promise.all(
        relocs.map((element) =>
          element.getLocation().then((loc) => ({
            description: {
              en: loc.city + ", " + loc.provinceEn,
              fr: loc.city + ", " + loc.provinceFr,
            },
            id: element.id,
            locationId: loc.id,
          }))
        )
      )
    );

  let lookingForNewJob = await profile.getLookingForANewJob().then((value) => {
    if (!value) {
      return null;
    }
    return {
      id: value.id,
      description: { en: value.descriptionEn, fr: value.descriptionFr },
    };
  });

  // Format location address to display (Number and street name, Province)
  const locationDescription = {
    en: location
      ? location.addressEn + ", " + location.city + ", " + location.provinceEn
      : null,
    fr: location
      ? location.addressFr + ", " + location.city + ", " + location.provinceFr
      : null,
  };

  //Response Object
  const visibleCards = data.visibleCards;

  // resData that will be sent by default to the Profile view
  let resData = {
    visibleCards,
    firstName: data.firstName,
    lastName: data.lastName,
    avatarColor: data.avatarColor,
    nameInitials: data.nameInitials,
    branch: { en: data.branchEn, fr: data.branchFr },
    organizationList,
    email: data.email,
    location: {
      id: location ? location.id : null,
      description: locationDescription,
    },
    manager: data.manager,
    telephone: data.telephone,
    cellphone: data.cellphone,
    jobTitle: { en: data.jobTitleEn, fr: data.jobTitleFr },
    flagged: data.flagged,
    linkedinUrl: data.linkedin,
    githubUrl: data.github,
    gcconnexUrl: data.gcconnex,
    team: data.team,
  };

  // send resData for EmploymentInfo card only if the card is visible
  if (visibleCards.info)
    resData = {
      ...resData,
      acting: {
        id: acting ? acting.id : null,
        description: acting ? acting.description : null,
      },
      actingPeriodStartDate: data.actingStartDate,
      actingPeriodEndDate: data.actingEndDate,
      classification: {
        id: groupLevel ? groupLevel.id : null,
        description: groupLevel ? groupLevel.description : null,
      },
      temporaryRole: {
        id: tenure ? tenure.id : null,
        description: {
          en: tenure ? tenure.descriptionEn : null,
          fr: tenure ? tenure.descriptionFr : null,
        },
      },
      security: {
        id: securityClearance ? securityClearance.id : null,
        description: {
          en: securityClearance ? securityClearance.descriptionEn : null,
          fr: securityClearance ? securityClearance.descriptionFr : null,
        },
      },
      indeterminate: data.indeterminate,
    };

  // send resData for TalentManagement card only if the card is visible
  if (visibleCards.talentManagement)
    resData = {
      ...resData,

      careerMobility: {
        id: careerMobility ? careerMobility.id : null,
        description: {
          en: careerMobility ? careerMobility.descriptionEn : null,
          fr: careerMobility ? careerMobility.descriptionFr : null,
        },
      },
      exFeeder: data.exFeeder,
      talentMatrixResult: {
        id: talentMatrixResult ? talentMatrixResult.id : null,
        description: {
          en: talentMatrixResult ? talentMatrixResult.descriptionEn : null,
          fr: talentMatrixResult ? talentMatrixResult.descriptionFr : null,
        },
      },
    };

  // send resData for officialLanguage card only if the card is visible
  if (visibleCards.officialLanguage)
    resData = {
      ...resData,
      gradedOnSecondLanguage: true,
      firstLanguage: {
        fr: { en: "French", fr: "Français" },
        en: { en: "English", fr: "Anglais" },
      }[data.firstLanguage],
      secondaryOralDate: secLangProf ? secLangProf.oralDate : null,
      secondaryOralProficiency: secLangProf
        ? secLangProf.oralProficiency
        : null,
      secondaryReadingDate: secLangProf ? secLangProf.readingDate : null,
      secondaryReadingProficiency: secLangProf
        ? secLangProf.readingProficiency
        : null,
      secondaryWritingDate: secLangProf ? secLangProf.writingDate : null,
      secondaryWritingProficiency: secLangProf
        ? secLangProf.writingProficiency
        : null,
      secondLanguage: {
        fr: { en: "French", fr: "Français" },
        en: { en: "English", fr: "Anglais" },
      }[data.secondLanguage],
    };

  // send resData for skills card only if the card is visible
  if (visibleCards.skills)
    resData = {
      ...resData,
      skills,
    };

  // send resData for mentorshipSkills card only if the card is visible
  if (visibleCards.mentorshipSkills)
    resData = {
      ...resData,
      mentorshipSkills,
      isMentor: data.isMentor,
    };

  // send resData for competencies card only if the card is visible
  if (visibleCards.competencies)
    resData = {
      ...resData,
      competencies,
    };

  // send resData for developmentalGoals card only if the card is visible
  if (visibleCards.developmentalGoals)
    resData = {
      ...resData,
      developmentalGoals,
    };

  // send resData for education card only if the card is visible
  if (visibleCards.education)
    resData = {
      ...resData,
      education: educArray,
    };

  // send resData for experience card only if the card is visible
  if (visibleCards.experience)
    resData = {
      ...resData,
      careerSummary,
    };

  // send resData for projects card only if the card is visible
  if (visibleCards.projects)
    resData = {
      ...resData,
      projects,
    };

  // send resData for careerInterests card only if the card is visible
  if (visibleCards.careerInterests)
    resData = {
      ...resData,
      interestedInRemote: data.interestedInRemote,
      relocationLocations: relocationLocations,
      lookingForNewJob: lookingForNewJob,
    };

  response.status(200).json(resData);
};

const getPrivateProfileById = async (request, response) => {
  const id = request.params.id;

  // get user profile
  let profile = await Profile.findOne({ where: { id: id } });
  if (!profile) {
    return response.status(404).json({
      status: "API Query Error",
      message: "User profile with the provided ID not found",
    });
  }

  // get user info based on profile
  let user = await profile.getUser();
  if (!user) {
    return response.status(404).json({
      status: "API Query Error",
      message: "User with the provided ID not found",
    });
  }

  if (!profile) response.status(404).send("Profile Not Found");
  let data = { ...profile.dataValues, ...user.dataValues };

  let tenure = await profile.getTenure().then((res) => {
    if (res) return res.dataValues;
  });

  let careerMobility = await profile.getCareerMobility().then((res) => {
    if (res) return res.dataValues;
  });

  let talentMatrixResult = await profile.getTalentMatrixResult().then((res) => {
    if (res) return res.dataValues;
  });

  let groupLevel = await profile.getGroupLevel().then((res) => {
    if (res) return res.dataValues;
  });

  let securityClearance = await profile.getSecurityClearance().then((res) => {
    if (res) return res.dataValues;
  });

  let acting = await profile.getActing().then((res) => {
    if (res) return res.dataValues;
  });

  let location = await profile.getLocation().then((res) => {
    if (res) return res.dataValues;
  });

  let experiences = await profile.getExperiences({
    order: [["startDate", "DESC"]],
  });
  let careerSummary = experiences.map((experience) => {
    let startDate = moment(experience.startDate);
    let endDate = moment(experience.endDate);

    return {
      subheader: experience.organization,
      header: experience.jobTitle,
      content: experience.description,
      startDate: startDate,
      endDate: endDate,
    };
  });

  let dbProjects = await profile.getProfileProjects();
  let projects = dbProjects.map((project) => {
    return { text: project.description };
  });

  let education = await profile.getEducation({
    order: [["startDate", "DESC"]],
  });
  let educations = () => {
    return Promise.all(
      education.map(async (educ) => {
        let startDate = moment(educ.startDate);
        let endDate = moment(educ.endDate);
        let school = await educ.getSchool().then((res) => {
          if (res) return res.dataValues;
        });
        let diploma = await educ.getDiploma().then((res) => {
          if (res) return res.dataValues;
        });
        educ = educ.dataValues;

        return {
          school: {
            id: school.id,
            description: { en: school.description, fr: school.description },
          },
          diploma: {
            id: diploma.id,
            description: {
              en: diploma.descriptionEn,
              fr: diploma.descriptionFr,
            },
          },
          content: "",
          startDate: { en: startDate, fr: startDate },
          endDate: { en: endDate, fr: endDate },
        };
      })
    );
  };

  let educArray = await educations();

  let organizationList = await profile
    .getProfileOrganizations({ order: [["tier", "ASC"]] })
    .then((organizations) => {
      let orgList = organizations.map((organization) => {
        return {
          en: organization.descriptionEn,
          fr: organization.descriptionFr,
        };
      });
      return orgList;
    });

  let skills = await profile.getSkills().map(async (skill) => {
    if (skill) {
      let cats = await skill.getCategory({
        attributes: ["descriptionEn", "descriptionFr", "id"],
        require: true,
      });

      return {
        id: skill.dataValues.id,
        description: {
          en: skill.dataValues.descriptionEn,
          fr: skill.dataValues.descriptionFr,
          category: {
            en: cats.dataValues.descriptionEn,
            fr: cats.dataValues.descriptionFr,
          },
          categoryId: skill.dataValues.categoryId,
        },
      };
    }
  });

  let profileSkills = [];

  let competencies = await profile.getCompetencies().map((competency) => {
    if (competency)
      return {
        id: competency.dataValues.id,
        description: {
          en: competency.dataValues.descriptionEn,
          fr: competency.dataValues.descriptionFr,
        },
      };
  });

  let developmentalGoals = await profile.getDevelopmentGoals().map((goal) => {
    if (goal)
      return {
        id: goal.dataValues.id,
        description: {
          en: goal.dataValues.descriptionEn,
          fr: goal.dataValues.descriptionFr,
        },
      };
  });

  let mentorshipSkills = await profile
    .getMentorshipSkills()
    .map(async (mentorshipSkill) => {
      if (mentorshipSkill) {
        let cats = await mentorshipSkill.getCategory({
          attributes: ["descriptionEn", "descriptionFr", "id"],
          require: true,
        });

        return {
          id: mentorshipSkill.dataValues.id,
          description: {
            en: mentorshipSkill.dataValues.descriptionEn,
            fr: mentorshipSkill.dataValues.descriptionFr,
            category: {
              en: cats.dataValues.descriptionEn,
              fr: cats.dataValues.descriptionFr,
            },
            categoryId: mentorshipSkill.dataValues.categoryId,
          },
        };
      }
    });

  let secLangProf = await profile.getSecondLanguageProficiency().then((res) => {
    if (res) return res.dataValues;
  });

  let relocationLocations = await profile
    .getRelocationLocations()
    .then((relocs) =>
      Promise.all(
        relocs.map((element) =>
          element.getLocation().then((loc) => ({
            description: {
              en: loc.city + ", " + loc.provinceEn,
              fr: loc.city + ", " + loc.provinceFr,
            },
            id: element.id,
            locationId: loc.id,
          }))
        )
      )
    );

  let lookingForNewJob = await profile.getLookingForANewJob().then((value) => {
    if (!value) {
      return null;
    }
    return {
      id: value.id,
      description: { en: value.descriptionEn, fr: value.descriptionFr },
    };
  });

  //Response Object
  let resData = {
    visibleCards: data.visibleCards,
    acting: {
      id: acting ? acting.id : null,
      description: acting ? acting.description : null,
    },
    actingPeriodStartDate: data.actingStartDate,
    actingPeriodEndDate: data.actingEndDate,
    branch: { en: data.branchEn, fr: data.branchFr },
    careerMobility: {
      id: careerMobility ? careerMobility.id : null,
      description: {
        en: careerMobility ? careerMobility.descriptionEn : null,
        fr: careerMobility ? careerMobility.descriptionFr : null,
      },
    },
    careerSummary,
    competencies,
    developmentalGoals,
    education: educArray,
    email: data.email,
    exFeeder: data.exFeeder,
    isMentor: data.isMentor,
    flagged: data.flagged,
    firstLanguage: {
      fr: { en: "French", fr: "Français" },
      en: { en: "English", fr: "Anglais" },
    }[data.firstLanguage],
    firstName: data.firstName,
    lastName: data.lastName,
    avatarColor: data.avatarColor,
    nameInitials: data.nameInitials,
    githubUrl: data.github,
    gradedOnSecondLanguage: true,
    classification: {
      id: groupLevel ? groupLevel.id : null,
      description: groupLevel ? groupLevel.description : null,
    },
    jobTitle: { en: data.jobTitleEn, fr: data.jobTitleFr },

    linkedinUrl: data.linkedin,
    location: {
      id: location ? location.id : null,
      description: {
        en: location
          ? location.addressEn +
            ", " +
            location.city +
            ", " +
            location.provinceEn
          : null,
        fr: location
          ? location.addressFr +
            ", " +
            location.city +
            ", " +
            location.provinceFr
          : null,
      },
    },

    manager: data.manager,
    cellphone: data.cellphone,
    organizationList,
    secondaryOralDate: secLangProf ? secLangProf.oralDate : null,
    secondaryOralProficiency: secLangProf ? secLangProf.oralProficiency : null,
    secondaryReadingDate: secLangProf ? secLangProf.readingDate : null,
    secondaryReadingProficiency: secLangProf
      ? secLangProf.readingProficiency
      : null,
    secondaryWritingDate: secLangProf ? secLangProf.writingDate : null,
    secondaryWritingProficiency: secLangProf
      ? secLangProf.writingProficiency
      : null,
    secondLanguage: null,
    security: {
      id: securityClearance ? securityClearance.id : null,
      description: {
        en: securityClearance ? securityClearance.descriptionEn : null,
        fr: securityClearance ? securityClearance.descriptionFr : null,
      },
    },
    // categories,
    skills,
    mentorshipSkills,
    temporaryRole: {
      id: tenure ? tenure.id : null,
      description: {
        en: tenure ? tenure.descriptionEn : null,
        fr: tenure ? tenure.descriptionFr : null,
      },
    },
    talentMatrixResult: {
      id: talentMatrixResult ? talentMatrixResult.id : null,
      description: {
        en: talentMatrixResult ? talentMatrixResult.descriptionEn : null,
        fr: talentMatrixResult ? talentMatrixResult.descriptionFr : null,
      },
    },
    team: data.team,
    telephone: data.telephone,
    gcconnexUrl: data.gcconnex,
    projects: projects,
    interestedInRemote: data.interestedInRemote,
    relocationLocations: relocationLocations,
    lookingForNewJob: lookingForNewJob,
    indeterminate: data.indeterminate,
  };
  console.log("private function called", resData);

  response.status(200).json(resData);
};

const getProfileStatusById = async (request, response) => {
  const id = request.params.id;
  let profile = await Profile.findOne({ where: { id: id } });
  return response.status(200).json({
    profile: { exists: !profile ? false : true },
  });
};

module.exports = {
  getProfile,
  getPublicProfileById,
  getPrivateProfileById,
  getProfileStatusById,
};