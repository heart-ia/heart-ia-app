import importlib
import pytest
from importlib.metadata import distributions

def test_dependencies():
    """Test that all dependencies in requirements.txt are installed and can be imported."""
    # Get the list of installed packages
    installed_packages = {dist.metadata['Name'].lower() for dist in distributions()}

    # Check if key dependencies are installed
    required_packages = ['fastapi', 'uvicorn', 'pytest', 'httpx']
    for package in required_packages:
        assert package in installed_packages, f"Package {package} is not installed"

        # Try to import the package
        try:
            importlib.import_module(package)
        except ImportError:
            pytest.fail(f"Failed to import {package}")
