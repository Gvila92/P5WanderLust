"""Add location column to blog_post table

Revision ID: 14aeca7be889
Revises: 
Create Date: 2024-01-16 23:28:21.618718

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '14aeca7be889'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('blog_post', schema=None) as batch_op:
        batch_op.add_column(sa.Column('location', sa.String(length=255), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('blog_post', schema=None) as batch_op:
        batch_op.drop_column('location')

    # ### end Alembic commands ###