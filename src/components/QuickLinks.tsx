"use client";

import React from "react";
import Link from "next/link";
import {
  Settings,
  Monitor,
  Building,
  Mail,
  FileText,
  HandshakeIcon,
  VideoIcon,
  Database,
  Coins,
  Mic,
  MapPin,
  Bell,
} from "lucide-react";

const quickLinks = [
    { icon: <Settings className="w-6 h-6" />, text: "학생정보시스템", link: "https://was1.hallym.ac.kr:8087/hlwc/mdi/Login.html" },
    { icon: <Monitor className="w-6 h-6" />, text: "한림Q&A", link: "https://hqna.hallym.ac.kr/hqna/index.do" },
    { icon: <Building className="w-6 h-6" />, text: "학생생활관", link: "https://dorm.hallym.ac.kr/dormitory/index.do" },
    { icon: <Mail className="w-6 h-6" />, text: "한림Become", link: "https://become.hallym.ac.kr/login.jsp?prevurl=" },
    { icon: <FileText className="w-6 h-6" />, text: "인터넷증명발급", link: "https://www.hallym.ac.kr/hallym_univ/sub02/cP11/cP4.html" },
    { icon: <HandshakeIcon className="w-6 h-6" />, text: "현장실습지원센터", link: "https://job.hallym.ac.kr/hallymjob/intern.do" },
    { icon: <VideoIcon className="w-6 h-6" />, text: "SmartLEAD", link: "https://smartlead.hallym.ac.kr/" },
    { icon: <Database className="w-6 h-6" />, text: "일송기념도서관", link: "https://library.hallym.ac.kr/" },
    { icon: <Coins className="w-6 h-6" />, text: "장학안내", link: "https://www.miricanvas.com/v/11sy83t" },
    { icon: <Mic className="w-6 h-6" />, text: "한림 신문고", link: "https://shinmungo.hallym.ac.kr/report/" },
    { icon: <MapPin className="w-6 h-6" />, text: "캠퍼스맵", link: "https://www.hallym.ac.kr/hallym_univ/sub04/cP6/sCP1" },
    { icon: <Bell className="w-6 h-6" />, text: "신입생면접합격발표", link: "https://hallymee.hallym.ac.kr/mid/0130000000" },
  ];

export default function QuickLinks() {
  return (
    <div className="bg-gray-50 p-6 rounded-lg">
      <h3 className="text-xl font-bold mb-6">Quick Menu</h3>
      <div className="grid grid-cols-3 gap-4">
        {quickLinks.map((item, index) => (
          <Link
            key={index}
            href={item.link}
            className="flex flex-col items-center text-center p-4 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="mb-2 text-primary">{item.icon}</div>
            <span className="text-sm text-muted-foreground">{item.text}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
