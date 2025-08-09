-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "password" TEXT,
    "emailVerified" DATETIME,
    "image" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "lastActive" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "onboarding_profiles" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "livingSituation" TEXT,
    "exposureHistory" TEXT,
    "symptoms" TEXT,
    "priorTests" TEXT,
    "budget" TEXT,
    "equipment" TEXT,
    "dietConstraints" TEXT,
    "timezone" TEXT,
    "preferredPace" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "onboarding_profiles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "modules" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "duration" INTEGER NOT NULL,
    "prerequisite" TEXT,
    "gatingRule" TEXT,
    "evidenceLevel" TEXT,
    "hasSafetyFlag" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "module_progress" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "moduleId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'locked',
    "progress" REAL NOT NULL DEFAULT 0,
    "timeSpent" INTEGER NOT NULL DEFAULT 0,
    "attemptCount" INTEGER NOT NULL DEFAULT 0,
    "startedAt" DATETIME,
    "lastActionAt" DATETIME,
    "completedAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "module_progress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "module_progress_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "modules" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "symptom_logs" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "fatigue" INTEGER NOT NULL,
    "brainFog" INTEGER NOT NULL,
    "sleep" INTEGER NOT NULL,
    "pain" INTEGER NOT NULL,
    "sinus" INTEGER NOT NULL,
    "mood" INTEGER NOT NULL,
    "energy" INTEGER NOT NULL,
    "notes" TEXT,
    "triggers" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "symptom_logs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "readiness" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "drainageScore" REAL NOT NULL,
    "binderUnlocked" BOOLEAN NOT NULL DEFAULT false,
    "lastCalculated" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "scoreHistory" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "readiness_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "tool_states" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "toolId" TEXT NOT NULL,
    "data" TEXT NOT NULL,
    "version" INTEGER NOT NULL DEFAULT 1,
    "lastSync" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "tool_states_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "purchases" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "sku" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'usd',
    "status" TEXT NOT NULL,
    "stripePaymentId" TEXT,
    "stripeCustomerId" TEXT,
    "startedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt" DATETIME,
    "refundedAt" DATETIME,
    "cancelReason" TEXT,
    CONSTRAINT "purchases_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "subscriptions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "tier" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "stripeSubscriptionId" TEXT,
    "stripeCustomerId" TEXT,
    "startedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "renewedAt" DATETIME,
    "cancelledAt" DATETIME,
    "expiresAt" DATETIME,
    CONSTRAINT "subscriptions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "badges" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "earnedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "badges_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "streaks" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "currentDays" INTEGER NOT NULL DEFAULT 0,
    "longestDays" INTEGER NOT NULL DEFAULT 0,
    "lastCheckIn" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "streaks_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "threads" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "isPinned" BOOLEAN NOT NULL DEFAULT false,
    "isLocked" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "threads_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "replies" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "threadId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "replies_threadId_fkey" FOREIGN KEY ("threadId") REFERENCES "threads" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "replies_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "analytics" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT,
    "event" TEXT NOT NULL,
    "properties" TEXT,
    "sessionId" TEXT,
    "deviceType" TEXT,
    "timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "analytics_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ab_tests" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "testName" TEXT NOT NULL,
    "variant" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ab_tests_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "email_logs" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT,
    "email" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "sentAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "onboarding_profiles_userId_key" ON "onboarding_profiles"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "modules_slug_key" ON "modules"("slug");

-- CreateIndex
CREATE INDEX "module_progress_userId_idx" ON "module_progress"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "module_progress_userId_moduleId_key" ON "module_progress"("userId", "moduleId");

-- CreateIndex
CREATE INDEX "symptom_logs_userId_date_idx" ON "symptom_logs"("userId", "date");

-- CreateIndex
CREATE UNIQUE INDEX "readiness_userId_key" ON "readiness"("userId");

-- CreateIndex
CREATE INDEX "tool_states_userId_idx" ON "tool_states"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "tool_states_userId_toolId_key" ON "tool_states"("userId", "toolId");

-- CreateIndex
CREATE UNIQUE INDEX "purchases_stripePaymentId_key" ON "purchases"("stripePaymentId");

-- CreateIndex
CREATE INDEX "purchases_userId_idx" ON "purchases"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "subscriptions_stripeSubscriptionId_key" ON "subscriptions"("stripeSubscriptionId");

-- CreateIndex
CREATE INDEX "subscriptions_userId_idx" ON "subscriptions"("userId");

-- CreateIndex
CREATE INDEX "badges_userId_idx" ON "badges"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "badges_userId_type_key" ON "badges"("userId", "type");

-- CreateIndex
CREATE UNIQUE INDEX "streaks_userId_key" ON "streaks"("userId");

-- CreateIndex
CREATE INDEX "threads_userId_idx" ON "threads"("userId");

-- CreateIndex
CREATE INDEX "replies_threadId_idx" ON "replies"("threadId");

-- CreateIndex
CREATE INDEX "replies_userId_idx" ON "replies"("userId");

-- CreateIndex
CREATE INDEX "analytics_userId_idx" ON "analytics"("userId");

-- CreateIndex
CREATE INDEX "analytics_event_idx" ON "analytics"("event");

-- CreateIndex
CREATE INDEX "ab_tests_userId_idx" ON "ab_tests"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "ab_tests_userId_testName_key" ON "ab_tests"("userId", "testName");

-- CreateIndex
CREATE INDEX "email_logs_userId_idx" ON "email_logs"("userId");

-- CreateIndex
CREATE INDEX "email_logs_email_idx" ON "email_logs"("email");
