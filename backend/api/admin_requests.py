from flask import Blueprint, render_template, request, redirect, url_for, flash, jsonify
from . import db
from flask_login import login_required, current_user, login_user, logout_user
from werkzeug.security import generate_password_hash, check_password_hash
import secrets

admin_requests = Blueprint('admin_requests', __name__)

