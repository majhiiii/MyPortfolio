# Technical Details to Confirm with Rakesh Majhi

The following items are functional in the portfolio using accurate production baseline patterns, but specific client-confidential parameters should be reviewed and verified by Rakesh:

1. **Amazon Connect & Salesforce Service Cloud CTI Integration**
   - **Status**: Implemented in `src/data/projects.ts` (Project 07) and `src/components/sections/ArchitectureBuilder.tsx` (Preset 5).
   - **Question**: Confirm specific CTI adapter version (e.g., Salesforce CTI Adapter v5.x vs Open CTI Lightning) and contact flow screen-pop routing matrix. Currently generic illustrative reference is shown.

2. **Full-Stack Tenure at Briskode Technology**
   - **Status**: Implemented in `src/components/sections/ExperienceSection.tsx` (Track 00, Mar 2024 – Oct 2024) and `src/data/projects.ts` (Project 06).
   - **Question**: Confirm any additional AWS services deployed beyond Amplify, CloudFront, ACM, RDS MySQL, Lambda, S3, Route 53, and EC2.

3. **Client IP & NDAs**
   - **Status**: Fully compliant. No client names, credentials, internal endpoints, or proprietary schemas are exposed anywhere in code or UI.
