'use client'

import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import {
  X,
  Home,
  BookOpen,
  Wrench,
  TrendingUp,
  Library,
  Users,
  Settings,
  HelpCircle,
} from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

interface MobileMenuProps {
  open: boolean
  onClose: () => void
  variant: 'marketing' | 'app'
}

const appNavigation = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Modules', href: '/modules', icon: BookOpen },
  { name: 'Tools', href: '/tools', icon: Wrench },
  { name: 'My Progress', href: '/progress', icon: TrendingUp },
  { name: 'Resources', href: '/library', icon: Library },
  { name: 'Community', href: '/community', icon: Users },
  { name: 'Settings', href: '/settings', icon: Settings },
  { name: 'Help & Support', href: '/help', icon: HelpCircle },
]

const marketingNavigation = [
  { name: 'Curriculum', href: '/#curriculum' },
  { name: 'Tools', href: '/#tools' },
  { name: 'Pricing', href: '/pricing' },
  { name: 'Free Preview', href: '/preview' },
]

export function MobileMenu({ open, onClose, variant }: MobileMenuProps) {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-300"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-300"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto relative w-screen max-w-md">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 sm:-ml-10 sm:pr-4">
                      <button
                        type="button"
                        className="rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                        onClick={onClose}
                      >
                        <span className="sr-only">Close panel</span>
                        <X className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                    <div className="px-4 sm:px-6">
                      <Dialog.Title className="text-lg font-medium text-gray-900">
                        {variant === 'marketing' ? 'Menu' : 'Navigation'}
                      </Dialog.Title>
                    </div>
                    <div className="relative mt-6 flex-1 px-4 sm:px-6">
                      {variant === 'marketing' ? (
                        <div className="space-y-6">
                          <nav className="space-y-1">
                            {marketingNavigation.map((item) => (
                              <Link
                                key={item.name}
                                href={item.href}
                                className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                                onClick={onClose}
                              >
                                {item.name}
                              </Link>
                            ))}
                          </nav>
                          <div className="space-y-4 border-t border-gray-200 pt-6">
                            <Link href="/signin" onClick={onClose}>
                              <Button variant="outline" className="w-full">
                                Sign In
                              </Button>
                            </Link>
                            <Link href="/signup" onClick={onClose}>
                              <Button className="w-full">Get Started</Button>
                            </Link>
                          </div>
                        </div>
                      ) : (
                        <nav className="space-y-1">
                          {appNavigation.map((item) => (
                            <Link
                              key={item.name}
                              href={item.href}
                              className="group flex items-center rounded-md px-2 py-2 text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                              onClick={onClose}
                            >
                              <item.icon
                                className="mr-4 h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                                aria-hidden="true"
                              />
                              {item.name}
                            </Link>
                          ))}
                        </nav>
                      )}
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
