# Insurance Advisor MVP

A comprehensive insurance recommendation system with a streamlined user experience, built with modern web technologies.

## 🏗️ Project Structure

```
insurance-advisor-mvp/
├── Frontend/                # Next.js Frontend Application
│   ├── src/
│   │   ├── app/            # App Router pages
│   │   ├── components/     # React components
│   │   ├── lib/           # Utilities and API client
│   │   ├── types/         # TypeScript definitions
│   │   └── styles/        # Global styles
│   ├── package.json
├── Backend/                 # NestJS REST API
│   ├── src/
│   │   ├── recommendation/  # Recommendation module
│   │   ├── entities/        # Database entities
│   │   ├── dto/            # Data transfer objects
│   │   └── main.ts         # Application entry point
│   ├── package.json
├── docker-compose.yml      # PostgreSQL database setup
└── README.md
```

## 🚀 Features

### 🎯 Streamlined User Experience
- **4-Field Form**: Simplified form with only essential fields (age, income, dependents, risk tolerance)
- **Instant Recommendations**: Fast, accurate insurance recommendations
- **Professional UI**: Clean, modern design with Tailwind CSS
- **Mobile-First**: Responsive design that works on all devices
- **Type Safety**: Full TypeScript implementation

### 🔧 Technical Excellence
- **Modern Stack**: Next.js 14, NestJS, PostgreSQL, TypeORM
- **Docker Integration**: Easy database setup with Docker Compose
- **Comprehensive Testing**: Unit tests with Jest
- **API Documentation**: REST API with clear endpoints
- **Production Ready**: Optimized builds and deployment-ready

### 📊 Smart Recommendation Engine
- **Risk Assessment**: Advanced algorithms considering age, income, dependents, and risk tolerance
- **Multiple Insurance Types**: Term Life, Whole Life, Universal Life, Final Expense
- **Premium Calculation**: Realistic premium estimates based on user profile
- **Coverage Optimization**: Appropriate coverage amounts for different life stages

## 🛠️ Quick Start

### Prerequisites
- Node.js (v18 or higher)
- Docker and Docker Compose
- npm or yarn

### 🚀 Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd insurance-advisor-mvp
   ```

2. **Start the database**
   ```bash
   docker-compose up -d
   ```

3. **Setup Backend**
   ```bash
   cd Backend
   npm install
   npm run start:dev
   ```

4. **Setup Frontend**
   ```bash
   cd Frontend
   npm install
   npm run dev
   ```

5. **Access the Application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3001
   - Database: PostgreSQL on port 5432
   - pgAdmin: http://localhost:5050

### 🔧 Environment Configuration

**Backend (.env)**
```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=admin
DB_PASSWORD=password123
DB_NAME=insurance_advisor
```

**Frontend (.env.local)**
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## 🎨 User Interface

### 🌟 Frontend Features
- **Hero Section**: Professional landing page with feature highlights
- **Streamlined Form**: Simple 4-field form focusing on essential information
- **Loading Animation**: Engaging spinner with progress indicators
- **Recommendation Display**: Beautiful card layout with financial details
- **Risk Assessment**: Visual risk indicators with color coding
- **Responsive Design**: Works perfectly on all device sizes
- **Error Handling**: User-friendly error messages and retry options

### 📝 Form Fields (Simplified)
The form has been streamlined to focus on the most important factors:
- **Age**: User's age (18-100 years)
- **Annual Income**: Income in USD (affects premium calculations)
- **Number of Dependents**: Family members requiring coverage (0-20)
- **Risk Tolerance**: Low, Medium, or High risk preference

### 🎨 Design System
- **Colors**: Professional blue primary (#3b82f6) with semantic color system
- **Typography**: Inter font for optimal readability
- **Components**: Consistent card-based layout with subtle shadows
- **Animations**: Smooth transitions and loading states
- **Accessibility**: ARIA labels and keyboard navigation support

### 📱 Responsive Breakpoints
- **Mobile**: < 768px (single column layout)
- **Tablet**: 768px - 1024px (optimized for touch)
- **Desktop**: > 1024px (full-width experience)

## 🔌 API Endpoints

### Create Recommendation
**POST** `/recommendation`

Generate an insurance recommendation based on user profile.

**Request Body:**
```json
{
  "age": 35,
  "income": 75000,
  "dependents": 2,
  "riskTolerance": "medium"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "primaryRecommendation": "Universal Life Insurance",
    "secondaryRecommendations": ["Disability Insurance", "Health Insurance Supplement"],
    "reasoning": "Flexible premium universal life provides good balance of coverage and investment growth",
    "estimatedPremium": 900,
    "coverageAmount": 600000,
    "riskAssessment": "Low Risk"
  },
  "message": "Recommendation generated successfully"
}
```

### Get All Submissions
**GET** `/recommendation/submissions`

Returns all user submissions with their recommendations.

### Get Submission by ID
**GET** `/recommendation/submissions/:id`

Returns a specific submission by its UUID.

## 🧠 Recommendation Logic

The system uses a sophisticated rules-based approach optimized for simplicity and accuracy:

### 🎯 Input Factors
- **Age Groups**: Different strategies for various life stages
  - Young Adults (18-30): Focus on affordable coverage with growth potential
  - Middle Age (30-55): Balance of coverage and investment features
  - Seniors (55+): Final expense and legacy planning focus
- **Risk Tolerance**: Personal risk preferences influence product selection
  - Low: Conservative products with guaranteed benefits
  - Medium: Balanced approach with flexible features
  - High: Cost-effective maximum coverage solutions
- **Income Level**: Affects premium calculations and coverage amounts
- **Dependents**: Number of family members influences coverage needs

### 🔍 Risk Assessment Algorithm
The system calculates risk scores based on:
```javascript
Risk Score = Age Factor + Risk Tolerance Factor + Dependents Factor
```

**Age Factor:**
- Age > 60: +3 points
- Age > 45: +2 points
- Age > 35: +1 point

**Risk Tolerance Factor:**
- High: +1 point
- Medium: 0 points
- Low: -1 point

**Dependents Factor:**
- More than 3 dependents: +1 point

**Risk Assessment:**
- Score 0-3: Low Risk
- Score 4-6: Medium Risk
- Score 7+: High Risk

### 🏆 Recommendation Types
1. **Term Life Insurance**: Cost-effective for maximum coverage
2. **Whole Life Insurance**: Conservative with guaranteed benefits
3. **Universal Life Insurance**: Flexible premiums with investment component
4. **Final Expense Insurance**: Focused on covering final expenses

### 💰 Premium Calculation
Premiums are calculated as a percentage of income, adjusted for:
- Age group multipliers
- Risk assessment factors
- Coverage amount ratios
- Market-competitive rates

## 🗄️ Database Schema

### User Submissions Table
```sql
CREATE TABLE user_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  age INTEGER NOT NULL,
  income DECIMAL(10,2) NOT NULL,
  dependents INTEGER NOT NULL,
  risk_tolerance VARCHAR(10) NOT NULL,
  recommendation JSONB NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Database Configuration
- **Host**: localhost:5432
- **Database**: insurance_advisor
- **Username**: admin
- **Password**: password123
- **pgAdmin**: localhost:5050

## 🔧 Development

### 📦 Technology Stack

**Frontend:**
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- React Hook Form
- Axios
- Lucide React Icons

**Backend:**
- NestJS
- TypeORM
- PostgreSQL
- Jest (Testing)
- Docker Compose

### 🚀 Available Scripts

**Backend:**
```bash
cd Backend
npm run start:dev    # Development mode with hot reload
npm run build        # Build the application
npm run test         # Run unit tests
npm run start:prod   # Production mode
npm run lint         # Run ESLint
```

**Frontend:**
```bash
cd Frontend
npm run dev          # Development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # TypeScript compiler check
```

### 🐳 Docker Management
```bash
# Start services
docker-compose up -d

# Stop services
docker-compose down

# View logs
docker-compose logs postgres

# Restart services
docker-compose restart
```

### 🔍 Database Access
**pgAdmin Interface:**
- URL: http://localhost:5050
- Email: admin@admin.com
- Password: admin

**Connection Settings:**
- Host: postgres (Docker) or localhost
- Port: 5432
- Database: insurance_advisor
- Username: admin
- Password: password123

### 🧪 Testing

**Backend Unit Tests:**
```bash
cd Backend
npm run test
```

**Manual API Testing:**
```bash
# Example request
curl -X POST http://localhost:3001/recommendation \
  -H "Content-Type: application/json" \
  -d '{
    "age": 35,
    "income": 75000,
    "dependents": 2,
    "riskTolerance": "medium"
  }'
```

## ☁️ AWS Deployment

### 🎯 Deployment Architecture

The application can be deployed on AWS using the following services:
- **Amazon ECS (Elastic Container Service)**: For containerized applications
- **Amazon RDS**: For PostgreSQL database
- **Application Load Balancer (ALB)**: For load balancing and SSL termination
- **Amazon ECR**: For container image registry
- **AWS CloudFormation**: For infrastructure as code
- **Route 53**: For DNS management

### 🚀 ECS Deployment Guide

#### Prerequisites
- AWS CLI configured with appropriate permissions
- Docker installed locally
- AWS account with necessary permissions

#### 1. Create Dockerfiles

**Backend Dockerfile:**
```dockerfile
# Backend/Dockerfile
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

COPY . .
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./package.json

EXPOSE 3001

USER node

CMD ["node", "dist/main.js"]
```

**Frontend Dockerfile:**
```dockerfile
# Frontend/Dockerfile
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

EXPOSE 3000

USER nextjs

CMD ["node", "server.js"]
```

#### 2. Create ECR Repositories

```bash
# Create ECR repositories
aws ecr create-repository --repository-name insurance-advisor-backend --region us-east-1
aws ecr create-repository --repository-name insurance-advisor-frontend --region us-east-1

# Get login token
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin <account-id>.dkr.ecr.us-east-1.amazonaws.com
```

#### 3. Build and Push Images

```bash
# Build and push backend
cd Backend
docker build -t insurance-advisor-backend .
docker tag insurance-advisor-backend:latest <account-id>.dkr.ecr.us-east-1.amazonaws.com/insurance-advisor-backend:latest
docker push <account-id>.dkr.ecr.us-east-1.amazonaws.com/insurance-advisor-backend:latest

# Build and push frontend
cd ../Frontend
docker build -t insurance-advisor-frontend .
docker tag insurance-advisor-frontend:latest <account-id>.dkr.ecr.us-east-1.amazonaws.com/insurance-advisor-frontend:latest
docker push <account-id>.dkr.ecr.us-east-1.amazonaws.com/insurance-advisor-frontend:latest
```

#### 4. Create RDS Database

```bash
# Create RDS PostgreSQL instance
aws rds create-db-instance \
  --db-instance-identifier insurance-advisor-db \
  --db-instance-class db.t3.micro \
  --engine postgres \
  --engine-version 14.9 \
  --master-username admin \
  --master-user-password "your-secure-password" \
  --allocated-storage 20 \
  --db-name insurance_advisor \
  --vpc-security-group-ids sg-xxxxxxxxx \
  --db-subnet-group-name default \
  --publicly-accessible \
  --region us-east-1
```

#### 5. Create ECS Cluster

```bash
# Create ECS cluster
aws ecs create-cluster \
  --cluster-name insurance-advisor-cluster \
  --capacity-providers EC2 FARGATE \
  --default-capacity-provider-strategy capacityProvider=FARGATE,weight=1 \
  --region us-east-1
```

#### 6. Create Task Definitions

**Backend Task Definition (backend-task-definition.json):**
```json
{
  "family": "insurance-advisor-backend",
  "networkMode": "awsvpc",
  "requiresCompatibilities": ["FARGATE"],
  "cpu": "256",
  "memory": "512",
  "executionRoleArn": "arn:aws:iam::<account-id>:role/ecsTaskExecutionRole",
  "containerDefinitions": [
    {
      "name": "backend",
      "image": "<account-id>.dkr.ecr.us-east-1.amazonaws.com/insurance-advisor-backend:latest",
      "portMappings": [
        {
          "containerPort": 3001,
          "protocol": "tcp"
        }
      ],
      "environment": [
        {
          "name": "DB_HOST",
          "value": "your-rds-endpoint.us-east-1.rds.amazonaws.com"
        },
        {
          "name": "DB_PORT",
          "value": "5432"
        },
        {
          "name": "DB_USERNAME",
          "value": "admin"
        },
        {
          "name": "DB_PASSWORD",
          "value": "your-secure-password"
        },
        {
          "name": "DB_NAME",
          "value": "insurance_advisor"
        }
      ],
      "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
          "awslogs-group": "/ecs/insurance-advisor-backend",
          "awslogs-region": "us-east-1",
          "awslogs-stream-prefix": "ecs"
        }
      }
    }
  ]
}
```

**Frontend Task Definition (frontend-task-definition.json):**
```json
{
  "family": "insurance-advisor-frontend",
  "networkMode": "awsvpc",
  "requiresCompatibilities": ["FARGATE"],
  "cpu": "256",
  "memory": "512",
  "executionRoleArn": "arn:aws:iam::<account-id>:role/ecsTaskExecutionRole",
  "containerDefinitions": [
    {
      "name": "frontend",
      "image": "<account-id>.dkr.ecr.us-east-1.amazonaws.com/insurance-advisor-frontend:latest",
      "portMappings": [
        {
          "containerPort": 3000,
          "protocol": "tcp"
        }
      ],
      "environment": [
        {
          "name": "NEXT_PUBLIC_API_URL",
          "value": "https://api.your-domain.com"
        }
      ],
      "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
          "awslogs-group": "/ecs/insurance-advisor-frontend",
          "awslogs-region": "us-east-1",
          "awslogs-stream-prefix": "ecs"
        }
      }
    }
  ]
}
```

#### 7. Register Task Definitions

```bash
# Register task definitions
aws ecs register-task-definition --cli-input-json file://backend-task-definition.json --region us-east-1
aws ecs register-task-definition --cli-input-json file://frontend-task-definition.json --region us-east-1
```

#### 8. Create Application Load Balancer

```bash
# Create ALB
aws elbv2 create-load-balancer \
  --name insurance-advisor-alb \
  --subnets subnet-xxxxxxxxx subnet-yyyyyyyyy \
  --security-groups sg-xxxxxxxxx \
  --region us-east-1

# Create target groups
aws elbv2 create-target-group \
  --name insurance-advisor-backend-tg \
  --protocol HTTP \
  --port 3001 \
  --vpc-id vpc-xxxxxxxxx \
  --target-type ip \
  --health-check-path /health \
  --region us-east-1

aws elbv2 create-target-group \
  --name insurance-advisor-frontend-tg \
  --protocol HTTP \
  --port 3000 \
  --vpc-id vpc-xxxxxxxxx \
  --target-type ip \
  --health-check-path / \
  --region us-east-1
```

#### 9. Create ECS Services

```bash
# Create backend service
aws ecs create-service \
  --cluster insurance-advisor-cluster \
  --service-name insurance-advisor-backend \
  --task-definition insurance-advisor-backend:1 \
  --desired-count 1 \
  --launch-type FARGATE \
  --network-configuration "awsvpcConfiguration={subnets=[subnet-xxxxxxxxx,subnet-yyyyyyyyy],securityGroups=[sg-xxxxxxxxx],assignPublicIp=ENABLED}" \
  --load-balancers targetGroupArn=arn:aws:elasticloadbalancing:us-east-1:account-id:targetgroup/insurance-advisor-backend-tg,containerName=backend,containerPort=3001 \
  --region us-east-1

# Create frontend service
aws ecs create-service \
  --cluster insurance-advisor-cluster \
  --service-name insurance-advisor-frontend \
  --task-definition insurance-advisor-frontend:1 \
  --desired-count 1 \
  --launch-type FARGATE \
  --network-configuration "awsvpcConfiguration={subnets=[subnet-xxxxxxxxx,subnet-yyyyyyyyy],securityGroups=[sg-xxxxxxxxx],assignPublicIp=ENABLED}" \
  --load-balancers targetGroupArn=arn:aws:elasticloadbalancing:us-east-1:account-id:targetgroup/insurance-advisor-frontend-tg,containerName=frontend,containerPort=3000 \
  --region us-east-1
```

#### 10. Configure ALB Listeners

```bash
# Create listener for frontend (port 80)
aws elbv2 create-listener \
  --load-balancer-arn arn:aws:elasticloadbalancing:us-east-1:account-id:loadbalancer/app/insurance-advisor-alb \
  --protocol HTTP \
  --port 80 \
  --default-actions Type=forward,TargetGroupArn=arn:aws:elasticloadbalancing:us-east-1:account-id:targetgroup/insurance-advisor-frontend-tg \
  --region us-east-1

# Create listener for backend API (port 8080)
aws elbv2 create-listener \
  --load-balancer-arn arn:aws:elasticloadbalancing:us-east-1:account-id:loadbalancer/app/insurance-advisor-alb \
  --protocol HTTP \
  --port 8080 \
  --default-actions Type=forward,TargetGroupArn=arn:aws:elasticloadbalancing:us-east-1:account-id:targetgroup/insurance-advisor-backend-tg \
  --region us-east-1
```

### 🔧 Environment Variables for Production

Create a `.env.production` file for backend:
```env
DB_HOST=your-rds-endpoint.us-east-1.rds.amazonaws.com
DB_PORT=5432
DB_USERNAME=admin
DB_PASSWORD=your-secure-password
DB_NAME=insurance_advisor
NODE_ENV=production
```

### 🌐 Domain Configuration

#### Route 53 Setup
```bash
# Create hosted zone
aws route53 create-hosted-zone \
  --name your-domain.com \
  --caller-reference $(date +%s)

# Create A record pointing to ALB
aws route53 change-resource-record-sets \
  --hosted-zone-id Z123456789 \
  --change-batch '{
    "Changes": [{
      "Action": "CREATE",
      "ResourceRecordSet": {
        "Name": "your-domain.com",
        "Type": "A",
        "AliasTarget": {
          "DNSName": "your-alb-dns-name.us-east-1.elb.amazonaws.com",
          "EvaluateTargetHealth": false,
          "HostedZoneId": "Z35SXDOTRQ7X7K"
        }
      }
    }]
  }'
```

### 📈 Monitoring and Logging

#### CloudWatch Setup
```bash
# Create log groups
aws logs create-log-group --log-group-name /ecs/insurance-advisor-backend --region us-east-1
aws logs create-log-group --log-group-name /ecs/insurance-advisor-frontend --region us-east-1

# Create CloudWatch alarms
aws cloudwatch put-metric-alarm \
  --alarm-name "insurance-advisor-backend-cpu" \
  --alarm-description "Backend CPU utilization" \
  --metric-name CPUUtilization \
  --namespace AWS/ECS \
  --statistic Average \
  --period 300 \
  --threshold 80 \
  --comparison-operator GreaterThanThreshold \
  --evaluation-periods 2 \
  --region us-east-1
```

### 🔒 Security Best Practices

1. **Use AWS Secrets Manager** for sensitive data:
```bash
# Store database password in Secrets Manager
aws secretsmanager create-secret \
  --name "insurance-advisor/database" \
  --description "Database credentials" \
  --secret-string '{"username":"admin","password":"your-secure-password"}' \
  --region us-east-1
```

2. **Configure Security Groups**:
   - Backend: Allow inbound traffic on port 3001 from ALB security group
   - Frontend: Allow inbound traffic on port 3000 from ALB security group
   - Database: Allow inbound traffic on port 5432 from backend security group

3. **Enable SSL/TLS**:
   - Request SSL certificate from AWS Certificate Manager
   - Configure HTTPS listener on ALB
   - Redirect HTTP to HTTPS

### 💰 Cost Optimization

1. **Use Fargate Spot**: Reduce costs by 70% for non-critical workloads
2. **Auto Scaling**: Configure ECS service auto scaling based on CPU/memory
3. **RDS Reserved Instances**: Save up to 60% on database costs
4. **CloudWatch Logs Retention**: Set appropriate log retention periods

### 📊 Deployment Checklist

- [ ] Create ECR repositories
- [ ] Build and push Docker images
- [ ] Create RDS database
- [ ] Configure security groups
- [ ] Create ECS cluster
- [ ] Register task definitions
- [ ] Create Application Load Balancer
- [ ] Create target groups
- [ ] Create ECS services
- [ ] Configure DNS (Route 53)
- [ ] Set up SSL certificate
- [ ] Configure monitoring
- [ ] Test the deployment
- [ ] Set up CI/CD pipeline (optional)

### 🔄 CI/CD Pipeline (Optional)

For automated deployments, consider using:
- **AWS CodePipeline**: For continuous deployment
- **AWS CodeBuild**: For building Docker images
- **GitHub Actions**: For integration with GitHub repositories

This architecture provides a scalable, secure, and cost-effective deployment solution for the Insurance Advisor MVP on AWS.

## 📊 Performance & Optimization
