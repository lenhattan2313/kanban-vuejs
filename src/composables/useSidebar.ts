import { ref, computed } from 'vue'
import type { SidebarConfig, NavigationItem } from '@/types'
import { DEFAULT_NAVIGATION, getNavigationForRole } from '@/config/navigation'

export function useSidebar() {
  const isCollapsed = ref(false)
  const isMobileOpen = ref(false)
  const activeRoute = ref('/boards')

  // Default configuration
  const defaultConfig: SidebarConfig = {
    brand: {
      title: 'kanban.pr',
      subtitle: 'Project Management',
    },
    workspace: {
      id: '1',
      name: 'Test Project',
      avatarText: 'T',
    },
    navigation: DEFAULT_NAVIGATION,
    user: {
      id: '1',
      name: 'Le Nhat Tan',
      email: 'lenhattan2313@gmail.com',
      avatarText: 'L',
      role: 'admin',
    },
    features: {
      collapsible: true,
      mobileResponsive: true,
      showUserProfile: true,
      showWorkspaceInfo: true,
    },
  }

  const config = ref<SidebarConfig>(defaultConfig)

  // Computed properties
  const sidebarConfig = computed(() => config.value)
  // const currentNavigation = computed(() => config.value.navigation)

  // Methods
  const toggleCollapse = () => {
    isCollapsed.value = !isCollapsed.value
  }

  const toggleMobile = () => {
    isMobileOpen.value = !isMobileOpen.value
  }

  const closeMobile = () => {
    isMobileOpen.value = false
  }

  const setActiveRoute = (route: string) => {
    activeRoute.value = route
  }

  const updateConfig = (newConfig: Partial<SidebarConfig>) => {
    config.value = { ...config.value, ...newConfig }
  }

  const updateNavigation = (navigation: NavigationItem[]) => {
    config.value.navigation = navigation
  }

  const setNavigationForRole = (userRole: string) => {
    const roleNavigation = getNavigationForRole(userRole)
    config.value.navigation = roleNavigation
  }

  const updateUser = (user: SidebarConfig['user']) => {
    if (user) {
      config.value.user = user
    }
  }

  const updateWorkspace = (workspace: SidebarConfig['workspace']) => {
    if (workspace) {
      config.value.workspace = workspace
    }
  }

  const updateBrand = (brand: SidebarConfig['brand']) => {
    config.value.brand = brand
  }

  const updateFeatures = (features: SidebarConfig['features']) => {
    if (features) {
      config.value.features = { ...config.value.features, ...features }
    }
  }

  return {
    // State
    isCollapsed,
    isMobileOpen,
    activeRoute,
    config: sidebarConfig,

    // Methods
    toggleCollapse,
    toggleMobile,
    closeMobile,
    setActiveRoute,
    updateConfig,
    updateNavigation,
    setNavigationForRole,
    updateUser,
    updateWorkspace,
    updateBrand,
    updateFeatures,
  }
}
