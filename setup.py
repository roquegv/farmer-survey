from setuptools import setup, find_packages

with open("requirements.txt") as f:
	install_requires = f.read().strip().split("\n")

# get version from __version__ variable in armando_app/__init__.py
from armando_app import __version__ as version

setup(
	name="armando_app",
	version=version,
	description="App with a form to capture data about rural properties",
	author="Roque Vera",
	author_email="roquegv@gmail.com",
	packages=find_packages(),
	zip_safe=False,
	include_package_data=True,
	install_requires=install_requires
)
