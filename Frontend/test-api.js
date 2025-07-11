// Simple test to verify API integration
const axios = require('axios');

const testData = {
  age: 30,
  income: 75000,
  dependents: 2,
  riskTolerance: 'medium'
};

async function testApi() {
  try {
    console.log('Testing API integration...');
    console.log('Test data:', testData);
    
    const response = await axios.post('http://localhost:3001/recommendation', testData, {
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 10000,
    });
    
    console.log('✅ API Response Status:', response.status);
    console.log('✅ API Response Data:', JSON.stringify(response.data, null, 2));
    
    // Verify response structure
    const { data } = response.data;
    if (data && data.primaryRecommendation && data.reasoning) {
      console.log('✅ Response structure is valid');
    } else {
      console.log('❌ Response structure is invalid');
    }
    
  } catch (error) {
    console.error('❌ API Test failed:');
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    } else if (error.request) {
      console.error('Network error:', error.message);
    } else {
      console.error('Error:', error.message);
    }
  }
}

testApi();
