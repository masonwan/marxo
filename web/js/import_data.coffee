"use strict"

define 'import_data', ['models'], ({
Workflow, Workflows
}) ->

  data =
    workflows: [
#      name: 'Demo Workflow'
#      key: 'demo_workflow'
#      desc: 'Demo Workflow for App Dev and Logo Desgin'
#      start_node_id: 0
#      nodes: [
#        name: 'Post Idea'
#        key: 'post_idea'
#        desc: 'Post project idea'
#        offset:
#          x: 26, y: 43
#        actions: [
#          type: 'PAGE'
#        ,
#          type: 'FACEBOOK'
#        ,
#          type: 'WAIT'
#        ]
#      ,
#        name: 'Post Requirements'
#        key: 'post_requirements'
#        desc: 'Post requirements'
#        offset:
#          x: 334, y: 44
#        actions: [
#          type: 'PAGE'
#        ,
#          type: 'FACEBOOK'
#        ,
#          type: 'WAIT'
#        ]
#      ,
#        name: 'Cancel Notification'
#        key: 'cancel_notification'
#        desc: 'Cancel project for less response than expected'
#        offset:
#          x: 334, y: 204
#        actions: [
#          type: 'FACEBOOK'
#        ]
#      ,
#        name: 'Retrieve App Submissions'
#        key: 'retrieve_app_submissions'
#        desc: 'Retrieve app submissions'
#        offset:
#          x: 613, y: 44
#        actions: [
#          type: 'PAGE'
#        ,
#          type: 'FACEBOOK'
#        ,
#          type: 'WAIT'
#        ]
#      ,
#        name: 'Retrieve Logo Design'
#        key: 'retrieve_logo_design'
#        desc: 'Retrieve logo design'
#        offset:
#          x: 629, y: 282
#        actions: [
#          type: 'PAGE'
#        ,
#          type: 'FACEBOOK'
#        ,
#          type: 'WAIT'
#        ]
#      ,
#        name: 'Email to Evaluators'
#        key: 'email_to_evaluators'
#        desc: 'Email to evaluators'
#        offset:
#          x: 1018, y: 44
#        actions: [
#          type: 'PAGE'
#        ,
#          type: 'EMAIL'
#        ,
#          type: 'WAIT'
#        ]
#      ,
#        name: 'Post and Vote'
#        key: 'post_and_vote'
#        desc: 'Post and vote'
#        offset:
#          x: 1043, y: 282
#        actions: [
#          type: 'PAGE'
#        ,
#          type: 'FACEBOOK'
#        ,
#          type: 'WAIT'
#        ]
#      ,
#        name: 'Post Final Result and Reward'
#        key: 'post_final_result_and_reward'
#        desc: 'Post final result and reward'
#        offset:
#          x: 1420, y: 183
#        actions: [
#          type: 'PAGE'
#        ,
#          type: 'FACEBOOK'
#        ,
#          type: 'EMAIL'
#        ,
#          type: 'WAIT'
#        ]
#      ]
#      links: [
#        key: '10_days_likes_gte_300'
#        prev_node_id: 0
#        next_node_id: 1
#        name: '10 Days & Likes >= 300'
#      ,
#        key: '10_days_likes_lt_300'
#        prev_node_id: 0
#        next_node_id: 2
#        name: '10 Days & Likes < 300'
#      ,
#        key: 'post_req_to_retrieve_app'
#        prev_node_id: 1
#        next_node_id: 3
#      ,
#        key: 'post_req_to_retrieve_logo'
#        prev_node_id: 1
#        next_node_id: 4
#      ,
#        key: 'retrieve_app_to_evaluate'
#        prev_node_id: 3
#        next_node_id: 5
#        name: '15 Days & > 80% Response'
#      ,
#        key: 'retrieve_logo_to_post_and_vote'
#        prev_node_id: 4
#        next_node_id: 6
#        name: '10 Days & Submissions >= 3'
#      ,
#        name: '(fallback)'
#        key: 'faild_to_evaluate'
#        desc: 'Manual trigger back if failed to evaluate'
#        prev_node_id: 5
#        next_node_id: 3
#      ,
#        name: '(fallback)'
#        key: 'failed_to_vote'
#        desc: 'Manual trigger back if failed to vote'
#        prev_node_id: 6
#        next_node_id: 4
#      ,
#        key: 'evaluate_to_post_final'
#        prev_node_id: 5
#        next_node_id: 7
#      ,
#        key: 'post_and_vote_to_post_final'
#        prev_node_id: 6
#        next_node_id: 7
#      ]
#    ,
      name: 'Conference Check-in Mobile App'
      key: 'conf_app_dev'
      desc: 'Based on project requirements, use crowds sourcing to complete the development steps from ' +
      'design, implementation, testing, until the final result of this app. '
      start_node_id: 0
      nodes: [
        name: 'Requirement and Desgin'
        key: 'desgin'
        desc: 'Post requirement and collect desgins.'
        offset:
          x: 40, y: 110
        actions: [
          type: 'PAGE'
          name: 'Post Reqirement'
          key: 'post_req'
          content:
            type: 'PAGE'
            name: 'Conference Check-in Mobile App Reqirements and Design Submission'
            desc: ''
            sections: [
              name: 'Design Name'
              desc: 'The name of your app.'
              type: 'TEXT'
              options:
                required: true
                text_multiline: false
            ,
              name: 'Group Name'
              desc: 'The name of your development team or yourself.'
              type: 'TEXT'
              options:
                required: true
                text_multiline: false
            ,
              name: 'Team Members'
              desc: '''Your team members. One person per line with "First-name Last-name &lt;email&gt;" format.
              You can leave it blank if you are individual developer.'''
              type: 'TEXT'
              options:
                required: false
                text_multiline: true
            ,
              name: 'Design Introduction'
              desc: 'Give a brief introduction of your design.'
              type: 'HTML'
              options:
                required: true
            ,
              name: 'Upload Image'
              desc: 'Upload the image of your design. The image should be about 400x300px, not too big, not too small.'
              type: 'FILE'
              options:
                required: true
                file_accept: 'image/*'
            ,
              name: 'Upload Design Package'
              desc: 'Upload your design package, you should including ALL YOUR FILES in a ZIP/RAR/7Z format package.'
              type: 'FILE'
              options:
                required: true
            ,
              name: 'Comments'
              desc: 'Leave your comments if you want.'
              type: 'TEXT'
              options:
                required: false
                text_multiline: true
            ]
          tracking:
            duration: 2592000000 # 30 days
          event:
            duration: 0
        ,
          type: 'FACEBOOK'
          name: 'Post Requirement to Facebook'
          key: 'post_req_fb'
          content:
            type: 'FACEBOOK'
            message: '''Attention! Conference Check-in Mobile App start to receive submission.
            See requirements and submit your desgin in '''
          tracking:
            duration: 2592000000 # 30 days
          event:
            duration: 0
        ,
          type: 'WAIT'
          name: 'Wait for Design Submit'
          key: 'wait_for_design'
          event:
            duration: 864000000 # 10 days
        ]
      ,
        name: 'Vote App Design'
        key: 'vote'
        desc: 'Public vote submitted designs.'
        offset:
          x: 62, y: 235
        actions: [
          type: 'PAGE'
          name: 'Post Design Vote Form'
          key: 'post_design_vote_form'
          content:
            type: 'PAGE'
            name: 'Conference Check-in Mobile App Vote Your Favorite Design'
            desc: ''
            sections: [
              name: 'Vote Design'
              desc: 'Vote your favorite design.'
              type: 'RADIO'
              options:
                required: true
                gen_from_submission: 'post_req'
            ,
              name: 'Comments'
              desc: 'Leave your comments about the design you select and for all designs if you want.'
              type: 'TEXT'
              options:
                required: false
                text_multiline: true
            ]
          tracking:
            duration: 2592000000 # 30 days
          event:
            duration: 0
        ,
          type: 'FACEBOOK'
          name: 'Post Vote to Facebook'
          key: 'design_vote_fb'
          content:
            type: 'FACEBOOK'
            message: 'Vote your favorite desgin for our Conference Check-in Mobile App.'
          tracking:
            duration: 2592000000 # 30 days
          event:
            duration: 0
        ,
          type: 'WAIT'
          name: 'Wait for Design Vote'
          key: 'wait_for_desgin_vote'
          event:
            duration: 864000000 # 10 days
        ]
      ,
        name: 'Evaluate App Design'
        key: 'evaluate'
        desc: 'Evaluator judge the designs and votes.'
        offset:
          x: 50, y: 362
        actions: [
          type: 'PAGE'
          name: 'Post Evaluate Form'
          key: 'eval_form'
          content:
            type: 'PAGE'
            name: 'Conference Check-in Mobile App Choose the Best Design'
            desc: ''
            sections: [
              name: 'Choose Design'
              desc: 'Choose the best design you think.'
              type: 'RADIO'
              options:
                required: true
                gen_from_submission: 'post_req'
            ,
              name: 'Comments'
              desc: 'Leave your comments about the design you chose.'
              type: 'TEXT'
              options:
                required: true
                text_multiline: true
            ]
          tracking:
            duration: 2592000000 # 30 days
          event:
            duration: 0
        ,
          type: 'EMAIL'
          name: 'Send Email to Evaluator'
          key: 'email_eval'
          content:
            type: 'EMAIL'
            message: 'Choose the best desgin you think for our Conference Check-in Mobile App.'
          tracking:
            duration: 2592000000 # 30 days
          event:
            duration: 0
        ,
          type: 'WAIT'
          name: 'Wait for Evaluate'
          key: 'wait_for_eval'
          event:
            duration: 864000000 # 10 days
        ]
      ,
        name: 'App Implemetation'
        key: 'implemetation'
        desc: 'Post final design and wait for implemetation submission.'
        offset:
          x: 56, y: 490
        actions: [
          type: 'WAIT'
          name: 'Wait Owner Process Final Desgin'
          desc: 'The project owner should process the chosen desgin, prepare to post it on to the page.'
          key: 'proc_design'
          event:
            duration: 864000000 # 10 days
        ,
          type: 'PAGE'
          name: 'Post Final Desgin and Implement Submit Form'
          key: 'post_design_submit_impl'
          content:
            type: 'PAGE'
            name: 'Conference Check-in Mobile App Final Desgin and Implementation Submission'
            desc: ''
            sections: [
              name: 'Implementation Name'
              desc: 'Give a name to your app implementation.'
              type: 'TEXT'
              options:
                required: true
                text_multiline: false
            ,
              name: 'Group Name'
              desc: 'The name of your development team or yourself.'
              type: 'TEXT'
              options:
                required: true
                text_multiline: false
            ,
              name: 'Team Members'
              desc: '''Your team members. One person per line with "First-name Last-name &lt;email&gt;" format.
              You can leave it blank if you are individual developer.'''
              type: 'TEXT'
              options:
                required: false
                text_multiline: true
            ,
              name: 'Implemetation Description'
              desc: 'Give a detailed description for your implemetation.'
              type: 'HTML'
              options:
                required: true
            ,
              name: 'Upload Screenshot'
              desc: '''Upload the screenshot of your app to demonstrate your implementation.
              You can combine multiple screenshots into one image if you like.
              The image should be about 600x400px, not too big, not too small.'''
              type: 'FILE'
              options:
                required: true
                file_accept: 'image/*'
            ,
              name: 'Upload Implementation Package with Source Code'
              desc: '''Upload your implemetation package,
              you should including ALL YOUR FILES including scource code and necessary binaries in a ZIP/RAR/7Z format package.'''
              type: 'FILE'
              options:
                required: true
            ,
              name: 'Comments'
              desc: 'Leave your comments if you want.'
              type: 'TEXT'
              options:
                required: false
                text_multiline: true
            ]
          tracking:
            duration: 2592000000 # 30 days
          event:
            duration: 0
        ,
          type: 'FACEBOOK'
          name: 'Post Design to Facebook'
          key: 'desgin_impl_fb'
          content:
            type: 'FACEBOOK'
            message: '''The final desgin of Conference Check-in Mobile App is ready!
            Please submit your code in '''
          tracking:
            duration: 2592000000 # 30 days
          event:
            duration: 0
        ,
          type: 'WAIT'
          name: 'Wait for Implementation'
          key: 'wait_for_impl'
          event:
            duration: 864000000 # 10 days
        ]
      ,
        name: 'Review'
        key: 'review'
        desc: 'Evaluator review submitted app implemetations.'
        offset:
          x: 79, y: 615
        actions: [
          type: 'PAGE'
          name: 'Post Review Form'
          key: 'review_page'
          content:
            type: 'PAGE'
            name: 'Conference Check-in Mobile App Implemetation Review'
            desc: ''
            sections: [
              name: 'Choose Design'
              desc: 'Choose the best implemetation you think.'
              type: 'RADIO'
              options:
                required: true
                gen_from_submission: 'post_design_submit_impl'
            ,
              name: 'Comments'
              desc: 'Leave your comments about the design you chose.'
              type: 'TEXT'
              options:
                required: true
                text_multiline: true
            ]
          tracking:
            duration: 2592000000 # 30 days
          event:
            duration: 0
        ,
          type: 'EMAIL'
          name: 'Send Review Request Email'
          key: 'review_email'
          content:
            type: 'EMAIL'
            message: 'Choose the best implementaion you think for our Conference Check-in Mobile App.'
          tracking:
            duration: 2592000000 # 30 days
          event:
            duration: 0
        ,
          type: 'WAIT'
          name: 'Wait for Review'
          key: 'wait_for_review'
          event:
            duration: 864000000 # 10 days
        ]
      ,
        name: 'Testing'
        key: 'testing'
        desc: 'Post selected implementaion and open beta testing, collect feedbacks.'
        offset:
          x: 79, y: 742
        actions: [
          type: 'WAIT'
          name: 'Wait Owner Process Review and Implementation'
          key: 'proc_impl'
          event:
            duration: 864000000 # 10 days
        ,
          type: 'PAGE'
          name: 'Post Selected Implementation and Test Request'
          key: 'post_impl_test'
          tracking:
            duration: 2592000000 # 30 days
          event:
            duration: 0
        ,
          type: 'FACEBOOK'
          name: 'Post Implementation to Facebook'
          key: 'impl_fb'
          content:
            type: 'FACEBOOK'
            message: '''Our committee have the final result of the winner of implemetation of our app.
            Welcome to feedback any bugs or leave comments in '''
          tracking:
            duration: 2592000000 # 30 days
          event:
            duration: 0
        ,
          type: 'WAIT'
          name: 'Wait for Testing'
          key: 'wait_for_test'
          event:
            duration: 864000000 # 10 days
        ]
      ,
        name: 'Demo'
        key: 'demo'
        desc: 'Post final result to the public.'
        offset:
          x: 79, y: 866
        actions: [
          type: 'WAIT'
          name: 'Wait Owner Final Result'
          key: 'wait_for_result'
          event:
            duration: 864000000 # 10 days
        ,
          type: 'PAGE'
          name: 'Post Final Result and Demo'
          key: 'post_result'
          tracking:
            duration: 2592000000 # 30 days
          event:
            duration: 0
        ,
          type: 'FACEBOOK'
          name: 'Post Final Result to Facebook'
          key: 'result_fb'
          content:
            type: 'FACEBOOK'
            message: 'The Conference Check-in Mobile App is ready!\nSee our demo here '
          tracking:
            duration: 2592000000 # 30 days
          event:
            duration: 0
        ]
      ]
      links: [
        key: 'desgin_to_vote'
        prev_node_id: 0
        next_node_id: 1
      ,
        #name: 'Vote >= 200'
        key: 'vote_to_evaluate'
        prev_node_id: 1
        next_node_id: 2
      #,
      #  name: 'Failed to Pass'
      #  key: 'evaluate_to_desgin'
      #  prev_node_id: 2
      #  next_node_id: 0
      #,
      #  name: 'Votes < 200'
      #  key: 'vote_to_vote'
      #  prev_node_id: 1
      #  next_node_id: 1
      ,
        #name: 'Passed'
        key: 'evaluate_to_implemetation'
        prev_node_id: 2
        next_node_id: 3
      ,
        key: 'implemetation_to_review'
        prev_node_id: 3
        next_node_id: 4
      #,
      #  name: 'Not satisfied'
      #  key: 'review_to_implemetation'
      #  prev_node_id: 4
      #  next_node_id: 3
      ,
        key: 'review_to_testing'
        prev_node_id: 4
        next_node_id: 5
      ,
        key: 'testing_to_demo'
        prev_node_id: 5
        next_node_id: 6
      ]
    ]

  console.log 'data start importing...'

  (new Workflows data.workflows).forEach (wf) -> wf.save()

  return
