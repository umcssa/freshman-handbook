"""Freshman Handbook python package configuration."""

from setuptools import setup

setup(
    name='index',
    version='0.1.0',
    packages=['index'],
    include_package_data=True,
    install_requires=[
        'jieba==0.39',
        'bs4==0.0.1',
    ],
)
