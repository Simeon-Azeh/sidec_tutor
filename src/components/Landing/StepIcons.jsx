import React from 'react';
import { UserOutlined, SolutionOutlined, IdcardOutlined, BookOutlined, SmileOutlined } from '@ant-design/icons';
import { MdOutlineDocumentScanner } from "react-icons/md";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";

const StepIcons = [
  { icon: <UserOutlined />, title: 'Your Details' },
  { icon: <SolutionOutlined />, title: 'Verify Email' },
  { icon: <IdcardOutlined />, title: 'Choose Avatar' },
  { icon: <BookOutlined />, title: 'Educational Information' },
  { icon: <MdOutlineDocumentScanner />, title: 'Document Uploads' },
  { icon: <IoCheckmarkDoneCircleOutline />, title: 'Finish' },
];

export default StepIcons;
