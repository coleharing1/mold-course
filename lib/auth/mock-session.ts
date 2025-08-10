/**
 * TEMPORARY MOCK SESSION FOR DEVELOPMENT
 * TODO: REMOVE THIS FILE IN PHASE 3 WHEN RE-ENABLING AUTHENTICATION
 * 
 * This provides a mock user session for development purposes
 * to bypass authentication requirements while building features.
 */

export const mockUser = {
  id: 'dev-user-001',
  email: 'dev@molddetoxmastery.com',
  name: 'Development User',
  image: null,
}

export const mockSession = {
  user: mockUser,
  expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
}

/**
 * Mock getServerSession for development
 * Returns a fake session to bypass auth checks
 */
export async function getMockServerSession() {
  // Simulate async behavior
  await new Promise(resolve => setTimeout(resolve, 0))
  return mockSession
}

/**
 * Get mock user from database
 * Returns a fake user object for development
 */
export async function getMockUser() {
  return {
    id: mockUser.id,
    email: mockUser.email,
    name: mockUser.name,
    image: mockUser.image,
    emailVerified: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
    lastActive: new Date(),
    role: 'user' as const,
    stripeCustomerId: 'cus_mock_development',
    subscriptionStatus: 'active' as const,
    subscriptionTier: 'plus' as const,
  }
}