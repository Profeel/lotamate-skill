"""
Lotamate Skill for OpenClaw

Installation:
    pip install .
    # or
    pip install lotamate-skill
"""

from setuptools import setup, find_packages

setup(
    name='lotamate-skill',
    version='1.0.0',
    description='Lotamate Skill for OpenClaw - Access your Lotamate business data in AI assistants',
    author='Lotamate Team',
    author_email='support@lotamate.com',
    url='https://lotamate.com',
    packages=find_packages(),
    install_requires=[],
    python_requires='>=3.7',
    classifiers=[
        'Development Status :: 4 - Beta',
        'Intended Audience :: Developers',
        'License :: OSI Approved :: MIT License',
        'Programming Language :: Python :: 3',
        'Programming Language :: Python :: 3.7',
        'Programming Language :: Python :: 3.8',
        'Programming Language :: Python :: 3.9',
        'Programming Language :: Python :: 3.10',
        'Programming Language :: Python :: 3.11',
    ],
    keywords='openclaw skill lotamate crm business',
)