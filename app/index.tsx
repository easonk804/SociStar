// app/index.tsx
import { registerRootComponent } from 'expo';
import React from 'react';
import { StatusBar } from 'react-native'; // 导入状态栏组件
import Navigation from './Navigation'; // 导入导航组件

// 创建主应用组件
const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" /> {/* 设置状态栏样式 */}
      <Navigation /> {/* 渲染导航组件 */}
    </>
  );
};

// 注册根组件
registerRootComponent(App);

export default App;