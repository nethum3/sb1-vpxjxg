import axios from 'axios';
import { BusinessModel, BusinessModelOutput } from '../types';

const API_KEY = 'YOUR_GEMINI_API_KEY'; // Replace with your actual Gemini API key
const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

export async function generateBusinessModelOutput(model: BusinessModel): Promise<BusinessModelOutput> {
  try {
    const response = await axios.post(
      API_URL,
      {
        contents: [{
          parts: [{
            text: `Generate a business model output for ${model.name} with the following details:
            Skills: ${model.skills.join(', ')}
            Budget: $${model.budget.min} - $${model.budget.max}
            
            Please provide:
            1. A brief description (2-3 sentences)
            2. A list of 5 weekly tasks
            3. A growth strategy with 3-5 points
            4. Trend chart data (6 months of projected growth, provide as comma-separated numbers)
            5. Success chart data (probability of success in different areas: Market Fit, Scalability, Profitability, Sustainability, provide as comma-separated numbers between 0 and 1)

            Format the output as follows:
            Description: [Your description here]
            Weekly Tasks:
            - [Task 1]
            - [Task 2]
            - [Task 3]
            - [Task 4]
            - [Task 5]
            Growth Strategy:
            - [Strategy 1]
            - [Strategy 2]
            - [Strategy 3]
            Trend Chart Data: [comma-separated numbers]
            Success Chart Data: [comma-separated numbers]`
          }]
        }]
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`
        }
      }
    );

    const generatedContent = response.data.candidates[0].content.parts[0].text;
    
    // Parse the generated content
    const lines = generatedContent.split('\n');
    const description = lines.find(line => line.startsWith('Description:'))?.split(':')[1].trim() || '';
    const weeklyTasks = lines.filter(line => line.startsWith('- ')).slice(0, 5).map(task => task.substring(2));
    const growthStrategy = lines.filter(line => line.startsWith('- ')).slice(5).map(strategy => strategy.substring(2));
    
    const trendChartDataLine = lines.find(line => line.startsWith('Trend Chart Data:'));
    const trendChartData = trendChartDataLine ? trendChartDataLine.split(':')[1].trim().split(',').map(Number) : [];

    const successChartDataLine = lines.find(line => line.startsWith('Success Chart Data:'));
    const successChartData = successChartDataLine ? successChartDataLine.split(':')[1].trim().split(',').map(Number) : [];

    return {
      title: model.name,
      description,
      skills: model.skills,
      budget: model.budget,
      growthStrategy,
      weeklyTasks,
      trendChart: {
        labels: ['Month 1', 'Month 2', 'Month 3', 'Month 4', 'Month 5', 'Month 6'],
        data: trendChartData
      },
      successChart: {
        labels: ['Market Fit', 'Scalability', 'Profitability', 'Sustainability'],
        data: successChartData
      }
    };
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    throw new Error('Failed to generate business model output');
  }
}