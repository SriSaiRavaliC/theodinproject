import React from 'react';
import { useForm } from 'react-hook-form';
import { func, object } from 'prop-types';
import { yupResolver } from '@hookform/resolvers/yup';

import schema from '../schemas/project-submission-schema';

const EditForm = ({
  submission, onSubmit, onClose, onDelete,
}) => {
  const {
    register,
    handleSubmit,
    formState,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      repo_url: submission.repo_url,
      live_preview_url: submission.live_preview_url,
      is_public: submission.is_public,
    },
  });

  const {
    errors,
  } = formState;

  const handleDelete = () => {
    onDelete(submission.id);
    onClose();
  };

  if (formState.isSubmitSuccessful) {
    return (
      <div className="text-center">
        <h1 className="page-heading-title">Thanks for Updating Your Solution!</h1>
        <button
          type="button"
          className="button button--primary"
          onClick={onClose}
          data-test-id="close-btn"
        >
          Close
        </button>
      </div>
    );
  }

  /* eslint-disable react/jsx-props-no-spreading */
  return (
    <div data-test-id="edit-form">
      <h1 className="text-center page-heading-title">Edit Your Project</h1>

      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <input type="hidden" {...register('id')} value={submission.id} />
        <input type="hidden" {...register('lesson_id')} value={submission.lesson_id} />
        <div className="form__section">
          <span className="form__icon fab fa-github" />
          <input
            autoFocus
            className="form__element form__element--with-icon dark-form-input"
            type="text"
            {...register('repo_url')}
            placeholder="Repository URL"
            data-test-id="repo-url-field"
          />
        </div>
        {errors.repo_url && (
        <div className="form__error-message push-down">
          {' '}
          {errors.repo_url.message}
        </div>
        )}
        { submission.lesson_has_live_preview
          && (
          <>
            <div className="form__section">
              <span className="form__icon fas fa-link" />
              <input
                className="form__element form__element--with-icon dark-form-input"
                type="text"
                placeholder="Live Preview URL"
                {...register('live_preview_url')}
                data-test-id="live-preview-url-field"
              />
            </div>
            {errors.live_preview_url && (
            <div className="form__error-message push-down">
              {' '}
              {errors.live_preview_url.message}
            </div>
            ) }
          </>
          )}

        <div className="form-section form-section-center mb-0">
          <Toggle
            label="MAKE SOLUTION PUBLIC"
            onClick={handleOnClickToggle}
            isToggled={isToggled}
          />

          <div className="flex flex-col items-center sm:flex-row sm:justify-center">
            <button
              type="submit"
              className="button button--danger sm:mr-2"
              onClick={handleDelete}
              data-test-id="delete-btn"
            >
              Delete
            </button>
            <button
              disabled={formState.isSubmitting}
              type="submit"
              className="button button--primary mt-2 sm:mt-0"
              data-test-id="submit-btn"
            >
              Update
            </button>
          </div>
        </div>
      </form>
    </div>
  );
  /* eslint-enable react/jsx-props-no-spreading */
};

EditForm.propTypes = {
  submission: object.isRequired,
  onSubmit: func.isRequired,
  onClose: func.isRequired,
  onDelete: func.isRequired,
};

export default EditForm;
