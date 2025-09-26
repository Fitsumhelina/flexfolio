export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DEMO: '/demo',
  DASHBOARD: '/dashboard', // will be replaced with username-based routes
  DASHBOARD_MAIL: '/dashboard/mail',
  DASHBOARD_PROJECTS: '/dashboard/projects',
  DASHBOARD_SKILLS: '/dashboard/skills',
} as const;

export type RouteKey = keyof typeof ROUTES;

export function userPortfolio(username: string): string {
  return `/${username}`;
}

export function userDashboard(username: string): string {
  return `/${username}/dashboard`;
}

export function userDashboardMail(username: string): string {
  return `/${username}/dashboard/mail`;
}

export function userDashboardProjects(username: string): string {
  return `/${username}/dashboard/projects`;
}

export function userDashboardSkills(username: string): string {
  return `/${username}/dashboard/skills`;
}

