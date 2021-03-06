# Migration `20201112060647-add-qualified-pools-table`

This migration has been generated at 11/12/2020, 1:06:47 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TYPE "public"."Language" AS ENUM ('FRENCH', 'ENGLISH')

CREATE TYPE "public"."UserStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'HIDDEN')

CREATE TYPE "public"."Proficiency" AS ENUM ('READING', 'WRITING', 'ORAL')

CREATE TYPE "public"."ProficiencyLevel" AS ENUM ('A', 'B', 'C', 'E', 'X', 'NA')

CREATE TYPE "public"."CardVisibilityStatus" AS ENUM ('PRIVATE', 'PUBLIC', 'CONNECTIONS')

CREATE TYPE "public"."EmploymentEquityGroup" AS ENUM ('WOMEN', 'INDIGENOUS', 'DISABILITY', 'MINORITY')

CREATE TYPE "public"."BugsStatus" AS ENUM ('DUPLICATE', 'UNRESOLVED', 'RESOLVED')

CREATE TYPE "public"."BugsLocation" AS ENUM ('HOME', 'PROFILE', 'SEARCH', 'FORMS')

CREATE TABLE "public"."DbSeed" (
"id" text   NOT NULL ,
"createdAt" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updatedAt" timestamp(3)   NOT NULL ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."OpTransSecurityClearance" (
"id" text   NOT NULL ,
"createdAt" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updatedAt" timestamp(3)   NOT NULL ,
"language" "Language"  NOT NULL ,
"description" text   NOT NULL ,
"opSecurityClearanceId" text   ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."OpSecurityClearance" (
"id" text   NOT NULL ,
"createdAt" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updatedAt" timestamp(3)   NOT NULL ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."OpTransLookingJob" (
"id" text   NOT NULL ,
"createdAt" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updatedAt" timestamp(3)   NOT NULL ,
"language" "Language"  NOT NULL ,
"description" text   NOT NULL ,
"opLookingJobId" text   ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."OpLookingJob" (
"id" text   NOT NULL ,
"createdAt" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updatedAt" timestamp(3)   NOT NULL ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."OpTransTenure" (
"id" text   NOT NULL ,
"createdAt" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updatedAt" timestamp(3)   NOT NULL ,
"language" "Language"  NOT NULL ,
"name" text   NOT NULL ,
"opTenureId" text   ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."OpTenure" (
"id" text   NOT NULL ,
"createdAt" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updatedAt" timestamp(3)   NOT NULL ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."OpTransCareerMobility" (
"id" text   NOT NULL ,
"createdAt" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updatedAt" timestamp(3)   NOT NULL ,
"language" "Language"  NOT NULL ,
"description" text   NOT NULL ,
"opCareerMobilityId" text   ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."OpCareerMobility" (
"id" text   NOT NULL ,
"createdAt" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updatedAt" timestamp(3)   NOT NULL ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."OpTransTalentMatrixResult" (
"id" text   NOT NULL ,
"createdAt" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updatedAt" timestamp(3)   NOT NULL ,
"language" "Language"  NOT NULL ,
"description" text   NOT NULL ,
"opTalentMatrixResultId" text   ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."OpTalentMatrixResult" (
"id" text   NOT NULL ,
"createdAt" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updatedAt" timestamp(3)   NOT NULL ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."OpTransOfficeLocation" (
"id" text   NOT NULL ,
"createdAt" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updatedAt" timestamp(3)   NOT NULL ,
"language" "Language"  NOT NULL ,
"streetName" text   NOT NULL ,
"province" text   NOT NULL ,
"opOfficeLocationId" text   ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."OpOfficeLocation" (
"id" text   NOT NULL ,
"createdAt" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updatedAt" timestamp(3)   NOT NULL ,
"postalCode" text   NOT NULL ,
"streetNumber" integer   NOT NULL ,
"city" text   NOT NULL ,
"country" text   NOT NULL ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."OpClassification" (
"id" text   NOT NULL ,
"createdAt" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updatedAt" timestamp(3)   NOT NULL ,
"name" text   NOT NULL ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."OpTransSkill" (
"id" text   NOT NULL ,
"createdAt" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updatedAt" timestamp(3)   NOT NULL ,
"language" "Language"  NOT NULL ,
"name" text   NOT NULL ,
"opSkillId" text   ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."OpSkill" (
"id" text   NOT NULL ,
"createdAt" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updatedAt" timestamp(3)   NOT NULL ,
"categoryId" text   ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."OpTransCategory" (
"id" text   NOT NULL ,
"createdAt" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updatedAt" timestamp(3)   NOT NULL ,
"language" "Language"  NOT NULL ,
"name" text   NOT NULL ,
"opCategoryId" text   ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."OpCategory" (
"id" text   NOT NULL ,
"createdAt" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updatedAt" timestamp(3)   NOT NULL ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."OpTransCompetency" (
"id" text   NOT NULL ,
"createdAt" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updatedAt" timestamp(3)   NOT NULL ,
"language" "Language"  NOT NULL ,
"name" text   NOT NULL ,
"opCompetencyId" text   ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."OpCompetency" (
"id" text   NOT NULL ,
"createdAt" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updatedAt" timestamp(3)   NOT NULL ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."Competency" (
"id" text   NOT NULL ,
"createdAt" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updatedAt" timestamp(3)   NOT NULL ,
"userId" text   NOT NULL ,
"competencyId" text   NOT NULL ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."OpTransSchool" (
"id" text   NOT NULL ,
"createdAt" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updatedAt" timestamp(3)   NOT NULL ,
"language" "Language"  NOT NULL ,
"name" text   NOT NULL ,
"opSchoolId" text   ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."OpSchool" (
"id" text   NOT NULL ,
"createdAt" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updatedAt" timestamp(3)   NOT NULL ,
"abbrProvince" text   NOT NULL ,
"abbrCountry" text   NOT NULL ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."OpTransDiploma" (
"id" text   NOT NULL ,
"createdAt" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updatedAt" timestamp(3)   NOT NULL ,
"language" "Language"  NOT NULL ,
"description" text   NOT NULL ,
"opDiplomaId" text   ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."OpDiploma" (
"id" text   NOT NULL ,
"createdAt" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updatedAt" timestamp(3)   NOT NULL ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."OpTransRelocationLocation" (
"id" text   NOT NULL ,
"createdAt" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updatedAt" timestamp(3)   NOT NULL ,
"language" text   NOT NULL ,
"city" text   NOT NULL ,
"province" text   NOT NULL ,
"opRelocationLocationId" text   ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."OpRelocationLocation" (
"id" text   NOT NULL ,
"createdAt" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updatedAt" timestamp(3)   NOT NULL ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."TransEmploymentInfo" (
"id" text   NOT NULL ,
"createdAt" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updatedAt" timestamp(3)   NOT NULL ,
"language" "Language"  NOT NULL ,
"jobTitle" text   ,
"branch" text   ,
"employmentInfoId" text   ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."EmploymentInfo" (
"id" text   NOT NULL ,
"createdAt" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updatedAt" timestamp(3)   NOT NULL ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."VisibleCard" (
"id" text   NOT NULL ,
"createdAt" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updatedAt" timestamp(3)   NOT NULL ,
"info" "CardVisibilityStatus"  NOT NULL DEFAULT E'PRIVATE',
"talentManagement" "CardVisibilityStatus"  NOT NULL DEFAULT E'PRIVATE',
"officialLanguage" "CardVisibilityStatus"  NOT NULL DEFAULT E'PRIVATE',
"skills" "CardVisibilityStatus"  NOT NULL DEFAULT E'PRIVATE',
"competencies" "CardVisibilityStatus"  NOT NULL DEFAULT E'PRIVATE',
"developmentalGoals" "CardVisibilityStatus"  NOT NULL DEFAULT E'PRIVATE',
"qualifiedPools" "CardVisibilityStatus"  NOT NULL DEFAULT E'PRIVATE',
"description" "CardVisibilityStatus"  NOT NULL DEFAULT E'PRIVATE',
"education" "CardVisibilityStatus"  NOT NULL DEFAULT E'PRIVATE',
"experience" "CardVisibilityStatus"  NOT NULL DEFAULT E'PRIVATE',
"careerInterests" "CardVisibilityStatus"  NOT NULL DEFAULT E'PRIVATE',
"mentorshipSkills" "CardVisibilityStatus"  NOT NULL DEFAULT E'PRIVATE',
"exFeeder" "CardVisibilityStatus"  NOT NULL DEFAULT E'PRIVATE',
"employmentEquityGroup" "CardVisibilityStatus"  NOT NULL DEFAULT E'PRIVATE',
PRIMARY KEY ("id")
)

CREATE TABLE "public"."MentorshipSkill" (
"id" text   NOT NULL ,
"createdAt" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updatedAt" timestamp(3)   NOT NULL ,
"userId" text   NOT NULL ,
"skillId" text   NOT NULL ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."Skill" (
"id" text   NOT NULL ,
"createdAt" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updatedAt" timestamp(3)   NOT NULL ,
"userId" text   NOT NULL ,
"skillId" text   NOT NULL ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."DevelopmentalGoal" (
"id" text   NOT NULL ,
"createdAt" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updatedAt" timestamp(3)   NOT NULL ,
"userId" text   NOT NULL ,
"skillId" text   ,
"competencyId" text   ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."QualifiedPool" (
"id" text   NOT NULL ,
"createdAt" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updatedAt" timestamp(3)   NOT NULL ,
"userId" text   NOT NULL ,
"classificationId" text   NOT NULL ,
"jobTitle" text   NOT NULL ,
"selectionProcessNumber" text   NOT NULL ,
"jobPosterLink" text   NOT NULL ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."SecondLangProf" (
"id" text   NOT NULL ,
"createdAt" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updatedAt" timestamp(3)   NOT NULL ,
"userId" text   NOT NULL ,
"date" timestamp(3)   ,
"unknownExpiredDate" boolean   DEFAULT false,
"proficiency" "Proficiency"  NOT NULL ,
"level" "ProficiencyLevel"  NOT NULL ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."Organization" (
"id" text   NOT NULL ,
"createdAt" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updatedAt" timestamp(3)   NOT NULL ,
"userId" text   NOT NULL ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."OrganizationTier" (
"id" text   NOT NULL ,
"createdAt" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updatedAt" timestamp(3)   NOT NULL ,
"tier" integer   NOT NULL ,
"organizationId" text   ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."TransOrganization" (
"id" text   NOT NULL ,
"createdAt" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updatedAt" timestamp(3)   NOT NULL ,
"language" "Language"  NOT NULL ,
"description" text   NOT NULL ,
"organizationTierId" text   ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."Education" (
"id" text   NOT NULL ,
"createdAt" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updatedAt" timestamp(3)   NOT NULL ,
"userId" text   NOT NULL ,
"schoolId" text   ,
"diplomaId" text   ,
"endDate" timestamp(3)   ,
"startDate" timestamp(3)   ,
"ongoingDate" boolean   NOT NULL DEFAULT false,
"description" text   ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."TransExperience" (
"id" text   NOT NULL ,
"createdAt" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updatedAt" timestamp(3)   NOT NULL ,
"language" "Language"  NOT NULL ,
"description" text   ,
"jobTitle" text   NOT NULL ,
"organization" text   NOT NULL ,
"experienceId" text   ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."Experience" (
"id" text   NOT NULL ,
"createdAt" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updatedAt" timestamp(3)   NOT NULL ,
"userId" text   NOT NULL ,
"startDate" timestamp(3)   NOT NULL ,
"endDate" timestamp(3)   ,
"ongoingDate" boolean   NOT NULL DEFAULT false,
"projects" text []  ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."RelocationLocation" (
"id" text   NOT NULL ,
"createdAt" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updatedAt" timestamp(3)   NOT NULL ,
"relocationLocationId" text   NOT NULL ,
"userId" text   NOT NULL ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."OpTransAttachmentLinkName" (
"id" text   NOT NULL ,
"createdAt" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updatedAt" timestamp(3)   NOT NULL ,
"language" "Language"  NOT NULL ,
"name" text   NOT NULL ,
"opAttachmentLinkNameId" text   ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."OpAttachmentLinkName" (
"id" text   NOT NULL ,
"createdAt" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updatedAt" timestamp(3)   NOT NULL ,
"type" text   NOT NULL ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."TransAttachmentLink" (
"id" text   NOT NULL ,
"createdAt" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updatedAt" timestamp(3)   NOT NULL ,
"language" "Language"  NOT NULL ,
"nameId" text   NOT NULL ,
"url" text   NOT NULL ,
"attachmentLinkId" text   ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."AttachmentLink" (
"id" text   NOT NULL ,
"createdAt" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updatedAt" timestamp(3)   NOT NULL ,
"experienceId" text   ,
"educationId" text   ,
"userId" text   ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."Bug" (
"id" text   NOT NULL ,
"createdAt" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updatedAt" timestamp(3)   NOT NULL ,
"description" text   NOT NULL ,
"status" "BugsStatus"  NOT NULL DEFAULT E'UNRESOLVED',
"location" "BugsLocation"  NOT NULL ,
"appVersion" text   ,
"githubIssue" integer   ,
"userId" text   NOT NULL ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."User" (
"id" text   NOT NULL ,
"createdAt" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updatedAt" timestamp(3)   NOT NULL ,
"groupLevelId" text   ,
"actingLevelId" text   ,
"securityClearanceId" text   ,
"lookingJobId" text   ,
"tenureId" text   ,
"careerMobilityId" text   ,
"employmentInfoId" text   ,
"talentMatrixResultId" text   ,
"officeLocationId" text   ,
"visibleCardId" text   NOT NULL ,
"name" text   ,
"firstName" text   ,
"lastName" text   ,
"avatarColor" text   ,
"email" text   ,
"telephone" text   ,
"cellphone" text   ,
"manager" text   ,
"description" text   ,
"firstLanguage" "Language"  ,
"secondLanguage" "Language"  ,
"preferredLanguage" "Language"  NOT NULL DEFAULT E'ENGLISH',
"actingStartDate" timestamp(3)   ,
"actingEndDate" timestamp(3)   ,
"linkedin" text   ,
"github" text   ,
"gcconnex" text   ,
"exFeeder" boolean   NOT NULL DEFAULT false,
"interestedInRemote" boolean   ,
"status" "UserStatus"  NOT NULL DEFAULT E'ACTIVE',
"signupStep" integer   NOT NULL DEFAULT 1,
"teams" text []  ,
"employmentEquityGroups" "EmploymentEquityGroup"[]  ,
"userId" text   ,
PRIMARY KEY ("id")
)

CREATE UNIQUE INDEX "OpTransSecurityClearance.language_description_unique" ON "public"."OpTransSecurityClearance"("language", "description")

CREATE UNIQUE INDEX "OpTransLookingJob.language_description_unique" ON "public"."OpTransLookingJob"("language", "description")

CREATE UNIQUE INDEX "OpTransTenure.language_name_unique" ON "public"."OpTransTenure"("language", "name")

CREATE UNIQUE INDEX "OpTransCareerMobility.language_description_unique" ON "public"."OpTransCareerMobility"("language", "description")

CREATE UNIQUE INDEX "OpTransTalentMatrixResult.language_description_unique" ON "public"."OpTransTalentMatrixResult"("language", "description")

CREATE UNIQUE INDEX "OpClassification.name_unique" ON "public"."OpClassification"("name")

CREATE UNIQUE INDEX "OpTransSkill.language_name_unique" ON "public"."OpTransSkill"("language", "name")

CREATE UNIQUE INDEX "OpTransCategory.language_name_unique" ON "public"."OpTransCategory"("language", "name")

CREATE UNIQUE INDEX "OpTransCompetency.language_name_unique" ON "public"."OpTransCompetency"("language", "name")

CREATE UNIQUE INDEX "Competency.userId_competencyId_unique" ON "public"."Competency"("userId", "competencyId")

CREATE UNIQUE INDEX "OpTransRelocationLocation.language_city_province_unique" ON "public"."OpTransRelocationLocation"("language", "city", "province")

CREATE UNIQUE INDEX "MentorshipSkill.userId_skillId_unique" ON "public"."MentorshipSkill"("userId", "skillId")

CREATE UNIQUE INDEX "Skill.userId_skillId_unique" ON "public"."Skill"("userId", "skillId")

CREATE UNIQUE INDEX "DevelopmentalGoal.userId_skillId_unique" ON "public"."DevelopmentalGoal"("userId", "skillId")

CREATE UNIQUE INDEX "DevelopmentalGoal.userId_competencyId_unique" ON "public"."DevelopmentalGoal"("userId", "competencyId")

CREATE UNIQUE INDEX "SecondLangProf.userId_proficiency_unique" ON "public"."SecondLangProf"("userId", "proficiency")

CREATE UNIQUE INDEX "Education.userId_schoolId_diplomaId_startDate_unique" ON "public"."Education"("userId", "schoolId", "diplomaId", "startDate")

CREATE UNIQUE INDEX "RelocationLocation.userId_relocationLocationId_unique" ON "public"."RelocationLocation"("userId", "relocationLocationId")

ALTER TABLE "public"."OpTransSecurityClearance" ADD FOREIGN KEY ("opSecurityClearanceId")REFERENCES "public"."OpSecurityClearance"("id") ON DELETE SET NULL ON UPDATE CASCADE

ALTER TABLE "public"."OpTransLookingJob" ADD FOREIGN KEY ("opLookingJobId")REFERENCES "public"."OpLookingJob"("id") ON DELETE SET NULL ON UPDATE CASCADE

ALTER TABLE "public"."OpTransTenure" ADD FOREIGN KEY ("opTenureId")REFERENCES "public"."OpTenure"("id") ON DELETE SET NULL ON UPDATE CASCADE

ALTER TABLE "public"."OpTransCareerMobility" ADD FOREIGN KEY ("opCareerMobilityId")REFERENCES "public"."OpCareerMobility"("id") ON DELETE SET NULL ON UPDATE CASCADE

ALTER TABLE "public"."OpTransTalentMatrixResult" ADD FOREIGN KEY ("opTalentMatrixResultId")REFERENCES "public"."OpTalentMatrixResult"("id") ON DELETE SET NULL ON UPDATE CASCADE

ALTER TABLE "public"."OpTransOfficeLocation" ADD FOREIGN KEY ("opOfficeLocationId")REFERENCES "public"."OpOfficeLocation"("id") ON DELETE SET NULL ON UPDATE CASCADE

ALTER TABLE "public"."OpTransSkill" ADD FOREIGN KEY ("opSkillId")REFERENCES "public"."OpSkill"("id") ON DELETE SET NULL ON UPDATE CASCADE

ALTER TABLE "public"."OpSkill" ADD FOREIGN KEY ("categoryId")REFERENCES "public"."OpCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE

ALTER TABLE "public"."OpTransCategory" ADD FOREIGN KEY ("opCategoryId")REFERENCES "public"."OpCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE

ALTER TABLE "public"."OpTransCompetency" ADD FOREIGN KEY ("opCompetencyId")REFERENCES "public"."OpCompetency"("id") ON DELETE SET NULL ON UPDATE CASCADE

ALTER TABLE "public"."Competency" ADD FOREIGN KEY ("userId")REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "public"."Competency" ADD FOREIGN KEY ("competencyId")REFERENCES "public"."OpCompetency"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "public"."OpTransSchool" ADD FOREIGN KEY ("opSchoolId")REFERENCES "public"."OpSchool"("id") ON DELETE SET NULL ON UPDATE CASCADE

ALTER TABLE "public"."OpTransDiploma" ADD FOREIGN KEY ("opDiplomaId")REFERENCES "public"."OpDiploma"("id") ON DELETE SET NULL ON UPDATE CASCADE

ALTER TABLE "public"."OpTransRelocationLocation" ADD FOREIGN KEY ("opRelocationLocationId")REFERENCES "public"."OpRelocationLocation"("id") ON DELETE SET NULL ON UPDATE CASCADE

ALTER TABLE "public"."TransEmploymentInfo" ADD FOREIGN KEY ("employmentInfoId")REFERENCES "public"."EmploymentInfo"("id") ON DELETE SET NULL ON UPDATE CASCADE

ALTER TABLE "public"."MentorshipSkill" ADD FOREIGN KEY ("userId")REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "public"."MentorshipSkill" ADD FOREIGN KEY ("skillId")REFERENCES "public"."OpSkill"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "public"."Skill" ADD FOREIGN KEY ("userId")REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "public"."Skill" ADD FOREIGN KEY ("skillId")REFERENCES "public"."OpSkill"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "public"."DevelopmentalGoal" ADD FOREIGN KEY ("userId")REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "public"."DevelopmentalGoal" ADD FOREIGN KEY ("skillId")REFERENCES "public"."OpSkill"("id") ON DELETE SET NULL ON UPDATE CASCADE

ALTER TABLE "public"."DevelopmentalGoal" ADD FOREIGN KEY ("competencyId")REFERENCES "public"."OpCompetency"("id") ON DELETE SET NULL ON UPDATE CASCADE

ALTER TABLE "public"."QualifiedPool" ADD FOREIGN KEY ("userId")REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "public"."QualifiedPool" ADD FOREIGN KEY ("classificationId")REFERENCES "public"."OpClassification"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "public"."SecondLangProf" ADD FOREIGN KEY ("userId")REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "public"."Organization" ADD FOREIGN KEY ("userId")REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "public"."OrganizationTier" ADD FOREIGN KEY ("organizationId")REFERENCES "public"."Organization"("id") ON DELETE SET NULL ON UPDATE CASCADE

ALTER TABLE "public"."TransOrganization" ADD FOREIGN KEY ("organizationTierId")REFERENCES "public"."OrganizationTier"("id") ON DELETE SET NULL ON UPDATE CASCADE

ALTER TABLE "public"."Education" ADD FOREIGN KEY ("userId")REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "public"."Education" ADD FOREIGN KEY ("schoolId")REFERENCES "public"."OpSchool"("id") ON DELETE SET NULL ON UPDATE CASCADE

ALTER TABLE "public"."Education" ADD FOREIGN KEY ("diplomaId")REFERENCES "public"."OpDiploma"("id") ON DELETE SET NULL ON UPDATE CASCADE

ALTER TABLE "public"."TransExperience" ADD FOREIGN KEY ("experienceId")REFERENCES "public"."Experience"("id") ON DELETE SET NULL ON UPDATE CASCADE

ALTER TABLE "public"."Experience" ADD FOREIGN KEY ("userId")REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "public"."RelocationLocation" ADD FOREIGN KEY ("relocationLocationId")REFERENCES "public"."OpRelocationLocation"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "public"."RelocationLocation" ADD FOREIGN KEY ("userId")REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "public"."OpTransAttachmentLinkName" ADD FOREIGN KEY ("opAttachmentLinkNameId")REFERENCES "public"."OpAttachmentLinkName"("id") ON DELETE SET NULL ON UPDATE CASCADE

ALTER TABLE "public"."TransAttachmentLink" ADD FOREIGN KEY ("nameId")REFERENCES "public"."OpAttachmentLinkName"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "public"."TransAttachmentLink" ADD FOREIGN KEY ("attachmentLinkId")REFERENCES "public"."AttachmentLink"("id") ON DELETE SET NULL ON UPDATE CASCADE

ALTER TABLE "public"."AttachmentLink" ADD FOREIGN KEY ("experienceId")REFERENCES "public"."Experience"("id") ON DELETE SET NULL ON UPDATE CASCADE

ALTER TABLE "public"."AttachmentLink" ADD FOREIGN KEY ("educationId")REFERENCES "public"."Education"("id") ON DELETE SET NULL ON UPDATE CASCADE

ALTER TABLE "public"."AttachmentLink" ADD FOREIGN KEY ("userId")REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE

ALTER TABLE "public"."Bug" ADD FOREIGN KEY ("userId")REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "public"."User" ADD FOREIGN KEY ("groupLevelId")REFERENCES "public"."OpClassification"("id") ON DELETE SET NULL ON UPDATE CASCADE

ALTER TABLE "public"."User" ADD FOREIGN KEY ("actingLevelId")REFERENCES "public"."OpClassification"("id") ON DELETE SET NULL ON UPDATE CASCADE

ALTER TABLE "public"."User" ADD FOREIGN KEY ("securityClearanceId")REFERENCES "public"."OpSecurityClearance"("id") ON DELETE SET NULL ON UPDATE CASCADE

ALTER TABLE "public"."User" ADD FOREIGN KEY ("lookingJobId")REFERENCES "public"."OpLookingJob"("id") ON DELETE SET NULL ON UPDATE CASCADE

ALTER TABLE "public"."User" ADD FOREIGN KEY ("tenureId")REFERENCES "public"."OpTenure"("id") ON DELETE SET NULL ON UPDATE CASCADE

ALTER TABLE "public"."User" ADD FOREIGN KEY ("careerMobilityId")REFERENCES "public"."OpCareerMobility"("id") ON DELETE SET NULL ON UPDATE CASCADE

ALTER TABLE "public"."User" ADD FOREIGN KEY ("employmentInfoId")REFERENCES "public"."EmploymentInfo"("id") ON DELETE SET NULL ON UPDATE CASCADE

ALTER TABLE "public"."User" ADD FOREIGN KEY ("talentMatrixResultId")REFERENCES "public"."OpTalentMatrixResult"("id") ON DELETE SET NULL ON UPDATE CASCADE

ALTER TABLE "public"."User" ADD FOREIGN KEY ("officeLocationId")REFERENCES "public"."OpOfficeLocation"("id") ON DELETE SET NULL ON UPDATE CASCADE

ALTER TABLE "public"."User" ADD FOREIGN KEY ("visibleCardId")REFERENCES "public"."VisibleCard"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "public"."User" ADD FOREIGN KEY ("userId")REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201109171010-create-user-bugs..20201112060647-add-qualified-pools-table
--- datamodel.dml
+++ datamodel.dml
@@ -4,9 +4,9 @@
 }
 datasource db {
   provider = "postgresql"
-  url = "***"
+  url = "***"
 }
 model DbSeed {
   id        String   @id
@@ -66,109 +66,109 @@
   FORMS
 }
 model OpTransSecurityClearance {
-  id          String   @default(uuid()) @id
+  id          String   @id @default(uuid())
   createdAt   DateTime @default(now())
   updatedAt   DateTime @updatedAt
   language    Language
   description String
-  @@unique([language, description])
   opSecurityClearance   OpSecurityClearance? @relation(fields: [opSecurityClearanceId])
   opSecurityClearanceId String?
+  @@unique([language, description])
 }
 model OpSecurityClearance {
-  id           String                     @default(uuid()) @id
+  id           String                     @id @default(uuid())
   createdAt    DateTime                   @default(now())
   updatedAt    DateTime                   @updatedAt
   translations OpTransSecurityClearance[]
   users        User[]
 }
 model OpTransLookingJob {
-  id          String   @default(uuid()) @id
+  id          String   @id @default(uuid())
   createdAt   DateTime @default(now())
   updatedAt   DateTime @updatedAt
   language    Language
   description String
-  @@unique([language, description])
   opLookingJob   OpLookingJob? @relation(fields: [opLookingJobId])
   opLookingJobId String?
+  @@unique([language, description])
 }
 model OpLookingJob {
-  id           String              @default(uuid()) @id
+  id           String              @id @default(uuid())
   createdAt    DateTime            @default(now())
   updatedAt    DateTime            @updatedAt
   translations OpTransLookingJob[]
   users        User[]
 }
 model OpTransTenure {
-  id        String   @default(uuid()) @id
+  id        String   @id @default(uuid())
   createdAt DateTime @default(now())
   updatedAt DateTime @updatedAt
   language  Language
   name      String
-  @@unique([language, name])
   opTenures  OpTenure? @relation(fields: [opTenureId])
   opTenureId String?
+  @@unique([language, name])
 }
 model OpTenure {
-  id           String          @default(uuid()) @id
+  id           String          @id @default(uuid())
   createdAt    DateTime        @default(now())
   updatedAt    DateTime        @updatedAt
   translations OpTransTenure[]
   users        User[]
 }
 model OpTransCareerMobility {
-  id          String   @default(uuid()) @id
+  id          String   @id @default(uuid())
   createdAt   DateTime @default(now())
   updatedAt   DateTime @updatedAt
   language    Language
   description String
-  @@unique([language, description])
   opCareerMobility   OpCareerMobility? @relation(fields: [opCareerMobilityId])
   opCareerMobilityId String?
+  @@unique([language, description])
 }
 model OpCareerMobility {
-  id           String                  @default(uuid()) @id
+  id           String                  @id @default(uuid())
   createdAt    DateTime                @default(now())
   updatedAt    DateTime                @updatedAt
   translations OpTransCareerMobility[]
   users        User[]
 }
 model OpTransTalentMatrixResult {
-  id          String   @default(uuid()) @id
+  id          String   @id @default(uuid())
   createdAt   DateTime @default(now())
   updatedAt   DateTime @updatedAt
   language    Language
   description String
-  @@unique([language, description])
   opTalentMatrixResult   OpTalentMatrixResult? @relation(fields: [opTalentMatrixResultId])
   opTalentMatrixResultId String?
+  @@unique([language, description])
 }
 model OpTalentMatrixResult {
-  id           String                      @default(uuid()) @id
+  id           String                      @id @default(uuid())
   createdAt    DateTime                    @default(now())
   updatedAt    DateTime                    @updatedAt
   translations OpTransTalentMatrixResult[]
   users        User[]
 }
 model OpTransOfficeLocation {
-  id                 String            @default(uuid()) @id
+  id                 String            @id @default(uuid())
   createdAt          DateTime          @default(now())
   updatedAt          DateTime          @updatedAt
   language           Language
   streetName         String
@@ -177,9 +177,9 @@
   opOfficeLocationId String?
 }
 model OpOfficeLocation {
-  id           String                  @default(uuid()) @id
+  id           String                  @id @default(uuid())
   createdAt    DateTime                @default(now())
   updatedAt    DateTime                @updatedAt
   postalCode   String
   streetNumber Int
@@ -189,30 +189,31 @@
   users        User[]
 }
 model OpClassification {
-  id               String   @default(uuid()) @id
-  createdAt        DateTime @default(now())
-  updatedAt        DateTime @updatedAt
-  name             String   @unique
-  actingLevelUsers User[]   @relation("actingLevels")
-  groupLevelUsers  User[]   @relation("groupLevels")
+  id                 String          @id @default(uuid())
+  createdAt          DateTime        @default(now())
+  updatedAt          DateTime        @updatedAt
+  name               String          @unique
+  actingLevelUsers   User[]          @relation("actingLevels")
+  groupLevelUsers    User[]          @relation("groupLevels")
+  qualifiedPoolUsers QualifiedPool[] @relation("qualifiedPools")
 }
 model OpTransSkill {
-  id        String   @default(uuid()) @id
+  id        String   @id @default(uuid())
   createdAt DateTime @default(now())
   updatedAt DateTime @updatedAt
   language  Language
   name      String
-  @@unique([language, name])
   opSkill   OpSkill? @relation(fields: [opSkillId])
   opSkillId String?
+  @@unique([language, name])
 }
 model OpSkill {
-  id                 String              @default(uuid()) @id
+  id                 String              @id @default(uuid())
   createdAt          DateTime            @default(now())
   updatedAt          DateTime            @updatedAt
   categoryId         String?
   translations       OpTransSkill[]
@@ -222,50 +223,50 @@
   developmentalGoals DevelopmentalGoal[]
 }
 model OpTransCategory {
-  id        String   @default(uuid()) @id
+  id        String   @id @default(uuid())
   createdAt DateTime @default(now())
   updatedAt DateTime @updatedAt
   language  Language
   name      String
-  @@unique([language, name])
   opCategory   OpCategory? @relation(fields: [opCategoryId])
   opCategoryId String?
+  @@unique([language, name])
 }
 model OpCategory {
-  id           String            @default(uuid()) @id
+  id           String            @id @default(uuid())
   createdAt    DateTime          @default(now())
   updatedAt    DateTime          @updatedAt
   translations OpTransCategory[]
   opSkills     OpSkill[]
 }
 model OpTransCompetency {
-  id        String   @default(uuid()) @id
+  id        String   @id @default(uuid())
   createdAt DateTime @default(now())
   updatedAt DateTime @updatedAt
   language  Language
   name      String
-  @@unique([language, name])
   opCompetency   OpCompetency? @relation(fields: [opCompetencyId])
   opCompetencyId String?
+  @@unique([language, name])
 }
 model OpCompetency {
-  id                 String              @default(uuid()) @id
+  id                 String              @id @default(uuid())
   createdAt          DateTime            @default(now())
   updatedAt          DateTime            @updatedAt
   translations       OpTransCompetency[]
   developmentalGoals DevelopmentalGoal[]
   competencies       Competency[]
 }
 model Competency {
-  id           String       @default(uuid()) @id
+  id           String       @id @default(uuid())
   createdAt    DateTime     @default(now())
   updatedAt    DateTime     @updatedAt
   userId       String
   competencyId String
@@ -275,9 +276,9 @@
   @@unique([userId, competencyId])
 }
 model OpTransSchool {
-  id         String    @default(uuid()) @id
+  id         String    @id @default(uuid())
   createdAt  DateTime  @default(now())
   updatedAt  DateTime  @updatedAt
   language   Language
   name       String
@@ -285,9 +286,9 @@
   opSchoolId String?
 }
 model OpSchool {
-  id           String          @default(uuid()) @id
+  id           String          @id @default(uuid())
   createdAt    DateTime        @default(now())
   updatedAt    DateTime        @updatedAt
   abbrProvince String
   abbrCountry  String
@@ -295,9 +296,9 @@
   educations   Education[]
 }
 model OpTransDiploma {
-  id          String     @default(uuid()) @id
+  id          String     @id @default(uuid())
   createdAt   DateTime   @default(now())
   updatedAt   DateTime   @updatedAt
   language    Language
   description String
@@ -305,38 +306,38 @@
   opDiplomaId String?
 }
 model OpDiploma {
-  id           String           @default(uuid()) @id
+  id           String           @id @default(uuid())
   createdAt    DateTime         @default(now())
   updatedAt    DateTime         @updatedAt
   translations OpTransDiploma[]
   educations   Education[]
 }
 model OpTransRelocationLocation {
-  id        String   @default(uuid()) @id
+  id        String   @id @default(uuid())
   createdAt DateTime @default(now())
   updatedAt DateTime @updatedAt
   language  String
   city      String
   province  String
-  @@unique([language, city, province])
   opRelocationLocation   OpRelocationLocation? @relation(fields: [opRelocationLocationId])
   opRelocationLocationId String?
+  @@unique([language, city, province])
 }
 model OpRelocationLocation {
-  id                 String                      @default(uuid()) @id
+  id                 String                      @id @default(uuid())
   createdAt          DateTime                    @default(now())
   updatedAt          DateTime                    @updatedAt
   translations       OpTransRelocationLocation[]
   RelocationLocation RelocationLocation[]
 }
 model TransEmploymentInfo {
-  id               String          @default(uuid()) @id
+  id               String          @id @default(uuid())
   createdAt        DateTime        @default(now())
   updatedAt        DateTime        @updatedAt
   language         Language
   jobTitle         String?
@@ -345,25 +346,26 @@
   employmentInfoId String?
 }
 model EmploymentInfo {
-  id           String                @default(uuid()) @id
+  id           String                @id @default(uuid())
   createdAt    DateTime              @default(now())
   updatedAt    DateTime              @updatedAt
   translations TransEmploymentInfo[]
   users        User[]
 }
 model VisibleCard {
-  id                    String               @default(uuid()) @id
+  id                    String               @id @default(uuid())
   createdAt             DateTime             @default(now())
   updatedAt             DateTime             @updatedAt
   info                  CardVisibilityStatus @default(PRIVATE)
   talentManagement      CardVisibilityStatus @default(PRIVATE)
   officialLanguage      CardVisibilityStatus @default(PRIVATE)
   skills                CardVisibilityStatus @default(PRIVATE)
   competencies          CardVisibilityStatus @default(PRIVATE)
   developmentalGoals    CardVisibilityStatus @default(PRIVATE)
+  qualifiedPools        CardVisibilityStatus @default(PRIVATE)
   description           CardVisibilityStatus @default(PRIVATE)
   education             CardVisibilityStatus @default(PRIVATE)
   experience            CardVisibilityStatus @default(PRIVATE)
   careerInterests       CardVisibilityStatus @default(PRIVATE)
@@ -373,9 +375,9 @@
   users                 User[]
 }
 model MentorshipSkill {
-  id        String   @default(uuid()) @id
+  id        String   @id @default(uuid())
   createdAt DateTime @default(now())
   updatedAt DateTime @updatedAt
   userId    String
   skillId   String
@@ -385,9 +387,9 @@
   @@unique([userId, skillId])
 }
 model Skill {
-  id        String   @default(uuid()) @id
+  id        String   @id @default(uuid())
   createdAt DateTime @default(now())
   updatedAt DateTime @updatedAt
   userId    String
   skillId   String
@@ -397,9 +399,9 @@
   @@unique([userId, skillId])
 }
 model DevelopmentalGoal {
-  id           String        @default(uuid()) @id
+  id           String        @id @default(uuid())
   createdAt    DateTime      @default(now())
   updatedAt    DateTime      @updatedAt
   userId       String
   skillId      String?
@@ -411,10 +413,23 @@
   @@unique([userId, skillId])
   @@unique([userId, competencyId])
 }
+model QualifiedPool {
+  id                     String           @id @default(uuid())
+  createdAt              DateTime         @default(now())
+  updatedAt              DateTime         @updatedAt
+  userId                 String
+  classificationId       String
+  jobTitle               String
+  selectionProcessNumber String
+  jobPosterLink          String
+  user                   User             @relation(fields: [userId])
+  classification         OpClassification @relation("qualifiedPools", fields: [classificationId], references: [id])
+}
+
 model SecondLangProf {
-  id                 String           @default(uuid()) @id
+  id                 String           @id @default(uuid())
   createdAt          DateTime         @default(now())
   updatedAt          DateTime         @updatedAt
   userId             String
   date               DateTime?
@@ -426,18 +441,18 @@
   @@unique([userId, proficiency])
 }
 model Organization {
-  id               String             @default(uuid()) @id
+  id               String             @id @default(uuid())
   createdAt        DateTime           @default(now())
   updatedAt        DateTime           @updatedAt
   userId           String
   organizationTier OrganizationTier[]
   user             User               @relation(fields: [userId])
 }
 model OrganizationTier {
-  id             String              @default(uuid()) @id
+  id             String              @id @default(uuid())
   createdAt      DateTime            @default(now())
   updatedAt      DateTime            @updatedAt
   tier           Int
   organization   Organization?       @relation(fields: [organizationId])
@@ -445,9 +460,9 @@
   organizationId String?
 }
 model TransOrganization {
-  id                 String            @default(uuid()) @id
+  id                 String            @id @default(uuid())
   createdAt          DateTime          @default(now())
   updatedAt          DateTime          @updatedAt
   language           Language
   description        String
@@ -455,9 +470,9 @@
   organizationTierId String?
 }
 model Education {
-  id              String           @default(uuid()) @id
+  id              String           @id @default(uuid())
   createdAt       DateTime         @default(now())
   updatedAt       DateTime         @updatedAt
   userId          String
   schoolId        String?
@@ -474,9 +489,9 @@
   @@unique([userId, schoolId, diplomaId, startDate])
 }
 model TransExperience {
-  id           String      @default(uuid()) @id
+  id           String      @id @default(uuid())
   createdAt    DateTime    @default(now())
   updatedAt    DateTime    @updatedAt
   language     Language
   description  String?
@@ -486,9 +501,9 @@
   experienceId String?
 }
 model Experience {
-  id              String            @default(uuid()) @id
+  id              String            @id @default(uuid())
   createdAt       DateTime          @default(now())
   updatedAt       DateTime          @updatedAt
   translations    TransExperience[]
   userId          String
@@ -500,9 +515,9 @@
   user            User              @relation(fields: [userId])
 }
 model RelocationLocation {
-  id                   String               @default(uuid()) @id
+  id                   String               @id @default(uuid())
   createdAt            DateTime             @default(now())
   updatedAt            DateTime             @updatedAt
   relocationLocationId String
   relocationLocation   OpRelocationLocation @relation(fields: [relocationLocationId])
@@ -512,9 +527,9 @@
   @@unique([userId, relocationLocationId])
 }
 model OpTransAttachmentLinkName {
-  id        String   @default(uuid()) @id
+  id        String   @id @default(uuid())
   createdAt DateTime @default(now())
   updatedAt DateTime @updatedAt
   language  Language
   name      String
@@ -523,18 +538,18 @@
   opAttachmentLinkNameId String?
 }
 model OpAttachmentLinkName {
-  id                  String                      @default(uuid()) @id
+  id                  String                      @id @default(uuid())
   createdAt           DateTime                    @default(now())
   updatedAt           DateTime                    @updatedAt
   type                String
   translations        OpTransAttachmentLinkName[]
   TransAttachmentLink TransAttachmentLink[]
 }
 model TransAttachmentLink {
-  id        String   @default(uuid()) @id
+  id        String   @id @default(uuid())
   createdAt DateTime @default(now())
   updatedAt DateTime @updatedAt
   language  Language
   nameId    String
@@ -545,9 +560,9 @@
   attachmentLinkId String?
 }
 model AttachmentLink {
-  id           String                @default(uuid()) @id
+  id           String                @id @default(uuid())
   createdAt    DateTime              @default(now())
   updatedAt    DateTime              @updatedAt
   translations TransAttachmentLink[]
@@ -559,23 +574,23 @@
   userId       String?
 }
 model Bug {
-  id          String        @default(uuid()) @id
-  createdAt   DateTime      @default(now())
-  updatedAt   DateTime      @updatedAt
+  id        String   @id @default(uuid())
+  createdAt DateTime @default(now())
+  updatedAt DateTime @updatedAt
   description String
-  status      BugsStatus    @default(UNRESOLVED)
+  status      BugsStatus   @default(UNRESOLVED)
   location    BugsLocation
   appVersion  String?
   githubIssue Int?
-  user        User          @relation(fields: [userId], references: [id])
+  user        User         @relation(fields: [userId], references: [id])
   userId      String
 }
 model User {
-  id                            String                  @default(uuid()) @id
+  id                            String                  @id @default(uuid())
   createdAt                     DateTime                @default(now())
   updatedAt                     DateTime                @updatedAt
   groupLevelId                  String?
   actingLevelId                 String?
@@ -622,8 +637,9 @@
   mentorshipSkills              MentorshipSkill[]
   skills                        Skill[]
   developmentalGoals            DevelopmentalGoal[]
   developmentalGoalsAttachments AttachmentLink[]
+  qualifiedPools                QualifiedPool[]
   competencies                  Competency[]
   secondLangProfs               SecondLangProf[]
   organizations                 Organization[]
   educations                    Education[]
```


