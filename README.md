# Personal Project: Job Tech Stack
Project Stack: React, ExpressJS, NodeJS, MongoDB, CSS, Axios, ChartJS, JavaScript, Vercel, Clerk

## Purpose
- Full-Stack Project to display and job applications, as well as parsing job description 
'to keep a record of technical keywords.
- Analyze inputted information to create graphs (Pie, Line) to allow users to easily digest
 information.
 - Focus on reading documentation and practice JavaScript to fully develop this project from end-to-end.
 - Deploy server/client on Vercel so User(s) can access webpage at any given time.
 - Delve into NodeJS, ExpressJS, and MongoDB work cycle.

 ## Current Features
 - Parse User Input, store technical keywords (Java, SQL, AWS, MongoDB, etc).
 - Utilize React for a more dynamic webpage
 - Display global statistics i.e. technical keyword frequency, total "documents" submitted, 
show all user's submitted details in table-format.
- Analytics ( pie/line chart ) to display information in a more accessible/readable way via graphs.
- Deployed (client/server) on Vercel for cloud hosting.
- User(s) have the ability to update a submitted job description
  - Able to change all information e.g. job description, company name, location, and date
- User(s) have the ability to put notes for a specific job
- Added Sidebar for better navigation in application
- User(s) have the abilit to update their technical keywords with the updated list
  - Should mainly be used when the list of technical keyword(s) list has been modified.

## Website Link
- [Webpage](https://job-tech-stack-frontend.vercel.app)
- Test User Credentials:
  - Email: test@email.com
  - Password: testuser123456789
  
## Future Features
- Dynamic Analytics Modification
  - i.e. user can change line graph to show days/months/years or a specific range
- Add job "status"
  - Submitted, Rejected, Ghosted
- Ability to update status
- Combine technical keywords
  - i.e. APIs + API
- Possible Project Name Change to SkillSift
- Allow user to open a modal that shows the job's description (or the entire input) of a specific job.
  - Similar to update modal but for viewing purposes.
  - Most likely combine update/delete into one modal and remove href from company title and transform it to a button "visit link". This will remove clutter when viewing all job applications sent.
  - Additionally, Allow users to view information, update if needed, or delete when wanted.
- Reverse TF-IDF index
  - Allow users to find which job posting as the technical keyword
  - i.e. java --> job1, job5, job199, ...

  ## How to Run
  1. Go to the jobtechstack directory
  2. npm start
  3. Open new terminal
  4. Go to the jobtechstack/server directory
  5. npm run dev
  6. Open browser and navigate to localhost:3000