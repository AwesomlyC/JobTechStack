const STOPWORDS = ['i', 'me', 'my', 'myself', 'we', 'our', 'ours', 'ourselves', 'you', 'your', 'yours', 'yourself', 'yourselves', 'he', 'him',
    'his', 'himself', 'she', 'her', 'hers', 'herself', 'it', 'its', 'itself', 'they', 'them', 'their', 'theirs', 'themselves', 'what', 'which',
    'who', 'whom', 'this', 'that', 'these', 'those', 'am', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'having', 'do',
    'does', 'did', 'doing', 'a', 'an', 'the', 'and', 'but', 'if', 'or', 'because', 'as', 'until', 'while', 'of', 'at', 'by', 'for', 'with', 'about',
    'against', 'between', 'into', 'through', 'during', 'before', 'after', 'above', 'below', 'to', 'from', 'up', 'down', 'in', 'out', 'on', 'off',
    'over', 'under', 'again', 'further', 'then', 'once', 'here', 'there', 'when', 'where', 'why', 'how', 'all', 'any', 'both', 'each', 'few', 'more',
    'most', 'other', 'some', 'such', 'no', 'nor', 'not', 'only', 'own', 'same', 'so', 'than', 'too', 'very', 's', 't', 'can', 'will', 'just', 'don',
    'should', 'now'
];

const LANGAUGES = ['python', 'c', 'java', 'react', 'reactjs', 'javascript', 'typescript', 'php', 'ruby', 'swift', 'r', 'html', 'css',
    'html5', 'git', 'vuejs', 'vue', 'angularjs', 'angular', 'nodejs', 'node', 'tailwind', 'j2ee', 'playwright', 'bootstrap', 'foundation',
    'materialize', 'rust', 'css3', 'obj', 'go', 'scala', 'nextjs', 'remix', 'golang'
]

const DATABASES = ['nosql', 'mysql', 'postgresql', 'postgres', 'mongodb', 'cassandra', 'spark', 'sparks', 'sql', 'sqlite', 'msql', 'databricks',
    'databrick', 'azure', 'redis', 'apache', 'amazon', 'dynamodb', 'dynamo', 'couchbase', 'neo4j', 'graphql', 'aurora', 'rds', 'eks',
    'mssql', 'oracle', 'cloud', 'gcp', 'kafka', 'pinot', 'redshift', 'duckdb']

const METHODOLOGY = ['agile', 'scrum', 'sdlc', 'qa', 'seo',]

const OTHERS = ['rest', 'restful', 'restfuls', 'api', 'apis', 'xml', 'json', 'aws', 'microservices', 'microservice', 'spring', 'boot',
    'django', 'flask', 'ec2', 'ci', 'cd', 'cicd', 'vpc', 's3', 'jquery', 'ajax', 'etl', 'tomcat', 'blockchain']

const TOOLS = ['postman', 'jira', 'selenium', 'docker', 'kubernetes', 'kubernete', 'lambda', 'devops', 'devop', 'terraform',
    'cloudformation', 'bash', 'linux', 'macos', 'unix', 'windows', 'macintosh', 'ansible', 'jest', 'mocha', 'informatica', 'tabkeau',
    'circleci', 'snowflake', 'ai']

const CERTIFICATIONS = ['comptia', 'federal', 'clearance']
const DEGREES = ['bachelor', 'bachelors', 'master', 'masters']

function countRepeatedWords(sentence) {
    let words = sentence
        .toLowerCase()
        .replace(/[/,]/g, ' ')
        .replace(/[^\w\s/]/g, '')
        .split(/\s/)
        .filter(word => relevantKeyword(word));

    let wordMap = {};
    for (let i = 0; i < words.length; i++) {
        if (words[i] === '') {
            continue;
        }
        let currentWordCount = wordMap[words[i]];
        let count = currentWordCount ? currentWordCount : 0;
        wordMap[words[i]] = count + 1;
    }
    return wordMap;
}

// Only want technical keywords, discard everything else.
function relevantKeyword(word) {
    return !STOPWORDS.includes(word) &&
        (LANGAUGES.includes(word) || DATABASES.includes(word) || METHODOLOGY.includes(word) ||
            OTHERS.includes(word) || TOOLS.includes(word) || CERTIFICATIONS.includes(word) || DEGREES.includes(word));
}


module.exports = { countRepeatedWords };