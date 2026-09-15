"use client"

import { Link as LinkIcon, Mail, ExternalLink } from "lucide-react"
import { LinkedinIcon as Linkedin, GithubIcon as Github } from "@/components/icons"
import Link from "next/link"
import { siteConfig } from "@/config/site"

export function ConnectCard() {
  const connectLinks = [
    { name: "Email", href: `mailto:${siteConfig.email}`, icon: <Mail size={16} /> },
    { name: "LinkedIn", href: siteConfig.social.linkedin, icon: <Linkedin size={16} /> },
    { name: "GitHub", href: siteConfig.social.github, icon: <Github size={16} /> },
    { name: siteConfig.company, href: "#inbyo", icon: <ExternalLink size={16} /> },
  ]

  return (
    <div className="bento-card col-span-1 row-span-2 p-6 flex flex-col group">
      <div className="flex items-center gap-2 mb-6">
        <LinkIcon size={16} className="text-muted-foreground" />
        <span className="text-sm font-medium">Connect</span>
      </div>

      <div className="flex-1 flex flex-col justify-center gap-4">
        {connectLinks.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            target={link.href.startsWith("http") ? "_blank" : undefined}
            rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
            className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors group/link"
          >
            <span className="p-2 rounded-full bg-muted group-hover/link:bg-accent group-hover/link:text-accent-foreground transition-colors">
              {link.icon}
            </span>
            <span className="font-medium">{link.name}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
