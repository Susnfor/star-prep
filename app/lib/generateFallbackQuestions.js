export class QuestionGenerator {
    // job category mapping
    getJobCategory(jobTitle) {
        const jobTitle_lower = jobTitle.toLowerCase();
        
        // Software Engineering variations
        if (jobTitle_lower.includes('software') || 
            jobTitle_lower.includes('developer') || 
            jobTitle_lower.includes('programmer') || 
            jobTitle_lower.includes('engineer') || 
            jobTitle_lower.includes('frontend') || 
            jobTitle_lower.includes('backend') || 
            jobTitle_lower.includes('fullstack') || 
            jobTitle_lower.includes('web dev') ||
            jobTitle_lower.includes('mobile dev') ||
            jobTitle_lower.includes('devops')) {
            return "Software Engineering";
        }
        
        // Data Science variations
        if (jobTitle_lower.includes('data') || 
            jobTitle_lower.includes('analyst') || 
            jobTitle_lower.includes('scientist') || 
            jobTitle_lower.includes('machine learning') || 
            jobTitle_lower.includes('ml engineer') ||
            jobTitle_lower.includes('ai engineer') ||
            jobTitle_lower.includes('research') ||
            jobTitle_lower.includes('statistics')) {
            return "Data Science";
        }

                // Product Management variations
        if (jobTitle_lower.includes('product') || 
            jobTitle_lower.includes('pm') || 
            jobTitle_lower.includes('product manager') ||
            jobTitle_lower.includes('product owner')) {
            return "Product Management";
        }
        
        // Marketing variations
        if (jobTitle_lower.includes('marketing') || 
            jobTitle_lower.includes('digital marketing') || 
            jobTitle_lower.includes('brand') ||
            jobTitle_lower.includes('campaign') ||
            jobTitle_lower.includes('growth') ||
            jobTitle_lower.includes('content')) {
            return "Marketing";
        }
        
        // Finance variations
        if (jobTitle_lower.includes('finance') || 
            jobTitle_lower.includes('financial') || 
            jobTitle_lower.includes('accounting') ||
            jobTitle_lower.includes('analyst') ||
            jobTitle_lower.includes('investment') ||
            jobTitle_lower.includes('banking')) {
            return "Finance";
        }
        
        // Design variations
        if (jobTitle_lower.includes('design') || 
            jobTitle_lower.includes('ui') || 
            jobTitle_lower.includes('ux') ||
            jobTitle_lower.includes('creative') ||
            jobTitle_lower.includes('visual') ||
            jobTitle_lower.includes('graphic')) {
            return "Design";
        }

        // Sales variations
        if (jobTitle_lower.includes('sales') || 
            jobTitle_lower.includes('business development') || 
            jobTitle_lower.includes('account') ||
            jobTitle_lower.includes('client') ||
            jobTitle_lower.includes('revenue') ||
            jobTitle_lower.includes('relationship')) {
            return "Sales";
        }
        
        
        // Default to Behavioural Questions for unmatched jobs
        return "Behavioural Questions";
    }

    getFallbackQuestions(topic, numQuestions) {
        const fallbackQuestions = {
            "Behavioural Questions": [
                "Describe a time when you faced a significant challenge at work.",
                "How do you handle tight deadlines?",
                "Tell me about a time you had to work with a difficult team member.",
                "What motivates you in your work?",
                "How do you prioritise tasks when everything seems urgent?",
                "Describe a situation where you had to adapt to a significant change.",
                "How do you handle constructive criticism?",
                "Tell me about a time you had to make a tough decision.",
                "What is your approach to conflict resolution?",
                "Describe a time when you had to learn something new quickly.",
                "How do you handle stress and pressure?",
                "Tell me about a time you had to give difficult feedback.",
                "Describe a situation where you went above and beyond.",
                "How do you handle failure or setbacks?",
                "Tell me about a time you had to work with limited resources."
            ],
            "Software Engineering": [
                "Tell me about a challenging project you worked on.",
                "How do you approach debugging a complex issue?",
                "Describe your experience with version control systems.",
                "How do you ensure code quality in your projects?",
                "Explain a time when you had to learn a new technology quickly.",
                "What is your approach to testing and validation?",
                "How do you handle technical debt in your projects?",
                "Describe a time when you had to collaborate with cross-functional teams.",
                "What is your experience with Agile methodologies?",
                "How do you stay updated with the latest technology trends?",
                "Tell me about a time you optimized application performance.",
                "How do you approach code reviews?",
                "Describe a time when you had to refactor legacy code.",
                "What's your experience with cloud platforms?",
                "How do you handle security considerations in your code?"
            ],
            "Data Science": [
                "Describe your experience with data cleaning and preprocessing.",
                "How do you validate the accuracy of your models?",
                "Tell me about a data visualization project you've worked on.",
                "How do you handle missing data in datasets?",
                "Explain a machine learning project from start to finish.",
                "What is your approach to feature selection?",
                "How do you ensure reproducibility in your analyses?",
                "Describe a time when you had to explain complex data findings to a non-technical audience.",
                "What tools do you use for data analysis and why?",
                "How do you approach model deployment in production environments?",
                "Tell me about a time when your model performed poorly.",
                "How do you handle bias in datasets?",
                "Describe your experience with A/B testing.",
                "What's your approach to handling large datasets?",
                "How do you stay updated with new ML/AI techniques?"
            ],
            "Product Management": [
                "How do you prioritize features on a product roadmap?",
                "Describe a time when you had to make a difficult product decision.",
                "How do you gather and analyze user feedback?",
                "Tell me about a product launch you managed.",
                "How do you work with engineering teams to deliver products?",
                "Describe your approach to competitive analysis.",
                "How do you measure product success?",
                "Tell me about a time when a product feature didn't perform as expected.",
                "How do you balance technical debt with new feature development?",
                "Describe your experience with A/B testing and experimentation.",
                "How do you handle conflicting stakeholder requirements?",
                "Tell me about a time you had to pivot a product strategy.",
                "How do you conduct user research?",
                "Describe your experience with product analytics.",
                "How do you communicate product vision to different audiences?"
            ],
            "Marketing": [
                "Describe a successful marketing campaign you've worked on.",
                "How do you measure the effectiveness of marketing initiatives?",
                "Tell me about a time when a campaign didn't perform as expected.",
                "How do you identify and target your ideal customer?",
                "Describe your experience with digital marketing channels.",
                "How do you approach brand positioning and messaging?",
                "Tell me about a time when you had to market with a limited budget.",
                "How do you stay updated with marketing trends and best practices?",
                "Describe your experience with marketing analytics tools.",
                "How do you collaborate with sales teams to generate leads?",
                "Tell me about a time you had to rebrand or reposition a product.",
                "How do you approach content marketing strategy?",
                "Describe your experience with social media marketing.",
                "How do you handle negative brand publicity?",
                "What's your approach to influencer marketing?"
            ],
            "Finance": [
                "Describe your experience with financial modeling and analysis.",
                "How do you approach budgeting and forecasting?",
                "Tell me about a time when you identified a cost-saving opportunity.",
                "How do you assess and manage financial risk?",
                "Describe your experience with financial reporting and compliance.",
                "How do you communicate financial information to non-finance stakeholders?",
                "Tell me about a challenging financial decision you had to make.",
                "How do you stay updated with financial regulations and standards?",
                "Describe your experience with investment analysis.",
                "How do you approach variance analysis and performance monitoring?",
                "Tell me about a time you had to present to senior executives.",
                "How do you handle tight reporting deadlines?",
                "Describe your experience with financial audits.",
                "What's your approach to cash flow management?",
                "How do you evaluate potential acquisitions or investments?"
            ],
            "Design": [
                "Walk me through your design process for a recent project.",
                "How do you approach user research and incorporating feedback?",
                "Describe a time when you had to redesign something based on user feedback.",
                "How do you balance user needs with business requirements?",
                "Tell me about a challenging design problem you solved.",
                "How do you collaborate with developers to implement your designs?",
                "Describe your experience with design systems and consistency.",
                "How do you stay updated with design trends and best practices?",
                "Tell me about a time when stakeholders disagreed with your design decisions.",
                "How do you measure the success of your design solutions?",
                "Describe your experience with accessibility in design.",
                "How do you approach mobile-first design?",
                "Tell me about a time you had to design under tight constraints.",
                "What's your process for conducting usability testing?",
                "How do you handle design feedback and iteration?"
            ],
            "Sales": [
                "Describe your approach to identifying and qualifying leads.",
                "How do you handle objections during the sales process?",
                "Tell me about a time when you exceeded your sales targets.",
                "How do you build and maintain relationships with clients?",
                "Describe a challenging sale you closed.",
                "How do you stay motivated during slow periods?",
                "Tell me about a time when you lost a major deal and how you handled it.",
                "How do you approach territory management and pipeline development?",
                "Describe your experience with CRM systems and sales tools.",
                "How do you collaborate with marketing teams to generate leads?",
                "Tell me about a time you had to negotiate a complex deal.",
                "How do you handle price objections?",
                "Describe your approach to upselling and cross-selling.",
                "What's your strategy for managing long sales cycles?",
                "How do you maintain relationships with existing clients?"
            ]
        };

        // Use smart mapping to find the right category
        const category = this.getJobCategory(topic);
        const questions = fallbackQuestions[category] || fallbackQuestions["Behavioural Questions"];
        
        console.log(`Job "${topic}" mapped to category "${category}"`);
        
        return questions.slice(0, numQuestions);
    }
}

