import React, { useContext } from 'react';
import { Button, Form, Input, Checkbox, Spin, Alert } from 'antd';
import { FacebookFilled, GithubOutlined, InstagramOutlined, TwitterOutlined, YoutubeOutlined } from '@ant-design/icons';
import bg from '../assets/bg.jpg';
import { useLogInQuery } from '../store/carsApi';
import toast, { Toaster } from 'react-hot-toast';
import { Context } from '../context/Context';

function LogIn() {
  const { data = [], isLoading, error } = useLogInQuery();
  const { setToken } = useContext(Context); 

  const onFinish = (values) => {
    const user = data.find(item => item.username === values.userName && item.password === values.password);

    if (user) {
      toast.success(`Welcome, ${values.userName}!`);
      setTimeout(() => {
        setToken(user);
      }, 800);
    } else {
      toast.error('Error: Username or password is incorrect');
    }
  };

  return (
    <div className="min-h-screen relative flex">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="hidden lg:flex lg:w-1/2 relative">
        <img className="absolute w-full h-full object-cover" src={bg} alt="bg image" />
        <div className="absolute inset-0 bg-opacity-40" />
        <div className="absolute bottom-0 left-0 p-8 text-white">
          <h1 className="text-4xl font-bold mb-4">Welcome Back</h1>
          <p className="text-lg opacity-80 mb-6">
            It's a long established fact that a reader will be distracted by the readable content.
          </p>
          <div className="flex space-x-4">
            <FacebookFilled className="text-[25px]" />
            <TwitterOutlined className="text-[25px]" />
            <InstagramOutlined className="text-[25px]" />
            <YoutubeOutlined className="text-[25px]" />
            <GithubOutlined className="text-[25px]" />
          </div>
        </div>
      </div>

      {/* Login form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">Sign in</h2>

          {/* API yuklanish jarayoni */}
          {isLoading && <Spin size="large" className="block mx-auto mb-4" />}
          {error && <Alert message="Login Failed" type="error" showIcon className="mb-4" />}

          <Form name="login" initialValues={{ remember: true }} onFinish={onFinish} layout="vertical" className="w-full">
            <Form.Item label="UserName" name="userName" rules={[{ required: true, message: 'Please input your username!' }]}>
              <Input size="large" className="rounded-lg" />
            </Form.Item>

            <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
              <Input.Password size="large" className="rounded-lg" />
            </Form.Item>

            <Form.Item className="mb-2">
              <div className="flex justify-between items-center">
                <Checkbox>Remember Me</Checkbox>
                <a href="#" className="text-blue-600 hover:text-blue-800">Lost your password?</a>
              </div>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" size="large" className="w-full bg-blue-600 hover:bg-blue-700">
                Sign In Now
              </Button>
            </Form.Item>

            <p className="text-sm text-gray-600 text-center mt-4">
              Sign In Now 
              <a href="#" className="text-blue-600 hover:text-blue-800"> Terms of Service </a> |
              <a href="#" className="text-blue-600 hover:text-blue-800"> Privacy Policy</a>
            </p>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default LogIn;
