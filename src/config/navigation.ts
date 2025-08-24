import type { NavigationItem } from '@/types'

// Navigation configuration using icon names
export const DEFAULT_NAVIGATION: NavigationItem[] = [
  {
    id: 'boards',
    label: 'Boards',
    icon: 'layout-dashboard',
    route: '/boards',
    isActive: true,
  },
  {
    id: 'members',
    label: 'Members',
    icon: 'users',
    route: '/members',
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: 'settings',
    route: '/settings',
  },
]

// Extended navigation with additional features
export const EXTENDED_NAVIGATION: NavigationItem[] = [
  {
    id: 'boards',
    label: 'Boards',
    icon: 'layout-dashboard',
    route: '/boards',
    isActive: true,
  },
  {
    id: 'analytics',
    label: 'Analytics',
    icon: 'bar-chart-3',
    route: '/analytics',
  },
  {
    id: 'members',
    label: 'Members',
    icon: 'users',
    route: '/members',
  },
  {
    id: 'notifications',
    label: 'Notifications',
    icon: 'bell',
    route: '/notifications',
    badge: 3,
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: 'settings',
    children: [
      {
        id: 'general',
        label: 'General',
        route: '/settings/general',
      },
      {
        id: 'security',
        label: 'Security',
        route: '/settings/security',
      },
      {
        id: 'notifications',
        label: 'Notifications',
        route: '/settings/notifications',
      },
    ],
  },
  {
    id: 'help',
    label: 'Help & Support',
    icon: 'help-circle',
    route: '/help',
  },
]

// Function to get navigation items based on user role
export function getNavigationForRole(userRole: string): NavigationItem[] {
  const baseNavigation = [...DEFAULT_NAVIGATION]

  // Add role-specific items
  if (userRole === 'admin') {
    baseNavigation.push({
      id: 'analytics',
      label: 'Analytics',
      icon: 'bar-chart-3',
      route: '/analytics',
    })
  }

  return baseNavigation
}

// Function to mark active route
export function markActiveRoute(
  navigation: NavigationItem[],
  activeRoute: string,
): NavigationItem[] {
  return navigation.map((item) => ({
    ...item,
    isActive: item.route === activeRoute,
    children: item.children ? markActiveRoute(item.children, activeRoute) : undefined,
  }))
}
