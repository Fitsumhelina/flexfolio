export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DEMO: '/demo',
  DASHBOARD: '/dashboard',
  DASHBOARD_MAIL: '/dashboard/mail',
  DASHBOARD_PROJECTS: '/dashboard/projects',
  DASHBOARD_SKILLS: '/dashboard/skills',
} as const;

export type RouteKey = keyof typeof ROUTES;

export function userPortfolio(username: string): string {
  return `/${username}`;
}

