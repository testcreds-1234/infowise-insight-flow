import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  FileText,
  FlaskConical,
  BarChart3,
  Settings,
  Menu,
  X
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';

const sidebarItems = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard
  },
  {
    title: 'Document Ingestion',
    href: '/ingestion',
    icon: FileText
  },
  {
    title: 'Sandbox',
    href: '/sandbox',
    icon: FlaskConical
  },
  {
    title: 'Reports',
    href: '/reports',
    icon: BarChart3
  },
  {
    title: 'Settings',
    href: '/settings',
    icon: Settings
  }
];

export function AppSidebar() {
  const [manuallyCollapsed, setManuallyCollapsed] = useState(false);
  const { open, setOpen } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;
  const isExpanded = sidebarItems.some((item) => isActive(item.href));
  const isCollapsed = manuallyCollapsed || !open;

  const toggleCollapse = () => {
    setManuallyCollapsed(!manuallyCollapsed);
    if (manuallyCollapsed) {
      setOpen(true);
    }
  };

  return (
    <Sidebar
      className={cn(
        "neumorphic-card border-r transition-all duration-300",
        isCollapsed ? "w-14" : "w-64"
      )}
      collapsible="icon"
    >
      <SidebarContent>
        {/* Header */}
        <div className="p-4 border-b border-border/50">
          <div className="flex items-center justify-between">
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center space-x-2"
              >
                <div className="w-8 h-8 neumorphic-raised rounded-xl flex items-center justify-center bg-primary">
                  <span className="text-primary-foreground font-bold text-sm">I</span>
                </div>
                <span className="text-display text-lg text-foreground">Infowise</span>
              </motion.div>
            )}
            <button
              onClick={toggleCollapse}
              className="neumorphic-button p-2 rounded-xl"
            >
              {isCollapsed ? <Menu size={16} /> : <X size={16} />}
            </button>
          </div>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel className={cn(isCollapsed && "sr-only")}>
            Navigation
          </SidebarGroupLabel>
          
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2 p-4">
              {sidebarItems.map((item) => {
                const itemIsActive = isActive(item.href);
                
                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton 
                      asChild
                      className={cn(
                        "flex items-center space-x-3 px-3 py-3 rounded-xl transition-all duration-200",
                        "neumorphic-button text-sidebar-foreground hover:text-sidebar-primary",
                        itemIsActive && "neumorphic-pressed bg-sidebar-primary text-sidebar-primary-foreground"
                      )}
                    >
                      <NavLink to={item.href} end>
                        <item.icon size={20} className="flex-shrink-0" />
                        {!isCollapsed && (
                          <motion.span
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            className="text-sm font-medium"
                          >
                            {item.title}
                          </motion.span>
                        )}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}