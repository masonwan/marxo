"use strict"

define 'test_data', ['models'], (models) ->

  data =
    workflows: [
      id: '50447afb4728cb2036cf9ca0'
      title: 'Demo Workflow'
      name: 'demo_workflow'
      desc: 'Demo Workflow for App Dev and Logo Desgin'
      node_ids: [
        '50447afb4728cb2036cf9cb0'
        '50447afb4728cb2036cf9cb1'
        '50447afb4728cb2036cf9cb2'
        '50447afb4728cb2036cf9cb3'
        '50447afb4728cb2036cf9cb4'
        '50447afb4728cb2036cf9cb5'
        '50447afb4728cb2036cf9cb6'
        '50447afb4728cb2036cf9cb7'
      ]
      link_ids: [
        '50447afb4728cb2036cf9cc0'
        '50447afb4728cb2036cf9cc1'
        '50447afb4728cb2036cf9cc2'
        '50447afb4728cb2036cf9cc3'
        '50447afb4728cb2036cf9cc4'
        '50447afb4728cb2036cf9cc5'
        '50447afb4728cb2036cf9cc6'
        '50447afb4728cb2036cf9cc7'
        '50447afb4728cb2036cf9cc8'
        '50447afb4728cb2036cf9cc9'
      ]
      nodes: [
        id: '50447afb4728cb2036cf9cb0'
        title: 'Post Idea'
        name: 'post_idea'
        desc: 'Post project idea'
        created_at: '2013-06-27T00:23:31.747Z'
        updated_at: '2013-06-27T00:23:31.747Z'
        style: 'left: 26px; top: 43px;'
        actions: [
          id: '50447afb4728cb2036cf9f00'
          type: 'post_info_page'
        ,
          id: '50447afb4728cb2036cf9f01'
          type: 'post_to_multi_social_media'
        ,
          id: '50447afb4728cb2036cf9f02'
          type: 'generate_report'
        ]
      ,
        id: '50447afb4728cb2036cf9cb1'
        title: 'Post Requirements'
        name: 'post_requirements'
        desc: 'Post requirements'
        created_at: '2013-06-27T00:24:55.070Z'
        updated_at: '2013-06-27T00:24:55.070Z'
        style: 'left: 334px; top: 44px;'
        actions: [
          id: '50447afb4728cb2036cf9f03'
          type: 'post_info_page'
        ,
          id: '50447afb4728cb2036cf9ce4'
          type: 'post_to_multi_social_media'
        ,
          id: '50447afb4728cb2036cf9f05'
          type: 'generate_report'
        ]
      ,
        id: '50447afb4728cb2036cf9cb2'
        title: 'Cancel Notification'
        name: 'cancel_notification'
        desc: 'Cancel project for less response than expected'
        created_at: '2013-06-27T00:25:58.702Z'
        updated_at: '2013-06-27T00:25:58.702Z'
        style: 'left: 334px; top: 204px;'
        actions: [
          id: '50447afb4728cb2036cf9f06'
          type: 'post_to_multi_social_media'
        ]
      ,
        id: '50447afb4728cb2036cf9cb3'
        title: 'Retrieve App Submissions'
        name: 'retrieve_app_submissions'
        desc: 'Retrieve app submissions'
        created_at: '2013-06-27T00:32:46.817Z'
        updated_at: '2013-06-27T00:32:46.817Z'
        style: 'left: 613px; top: 44px;'
        actions: [
          id: '50447afb4728cb2036cf9f07'
          type: 'post_form'
        ,
          id: '50447afb4728cb2036cf9f08'
          type: 'post_to_multi_social_media'
        ,
          id: '50447afb4728cb2036cf9f09'
          type: 'generate_report'
        ]
      ,
        id: '50447afb4728cb2036cf9cb4'
        title: 'Retrieve Logo Design'
        name: 'retrieve_logo_design'
        desc: 'Retrieve logo design'
        created_at: '2013-06-27T00:35:36.856Z'
        updated_at: '2013-06-27T00:35:36.856Z'
        style: 'left: 629px; top: 282px;'
        actions: [
          id: '50447afb4728cb2036cf9f0a'
          type: 'post_form'
        ,
          id: '50447afb4728cb2036cf9f0b'
          type: 'post_to_multi_social_media'
        ,
          id: '50447afb4728cb2036cf9f0c'
          type: 'generate_report'
        ]
      ,
        id: '50447afb4728cb2036cf9cb5'
        title: 'Email to Evaluators'
        name: 'email_to_evaluators'
        desc: 'Email to evaluators'
        created_at: '2013-06-27T00:36:21.950Z'
        updated_at: '2013-06-27T00:36:21.950Z'
        style: 'left: 1018px; top: 44px;'
        actions: [
          id: '50447afb4728cb2036cf9f0d'
          type: 'post_form'
        ,
          id: '50447afb4728cb2036cf9f0e'
          type: 'send_email'
        ,
          id: '50447afb4728cb2036cf9f0f'
          type: 'generate_report'
        ]
      ,
        id: '50447afb4728cb2036cf9cb6'
        title: 'Post and Vote'
        name: 'post_and_vote'
        desc: 'Post and vote'
        created_at: '2013-06-27T00:36:47.097Z'
        updated_at: '2013-06-27T00:36:47.097Z'
        style: 'left: 1043px; top: 282px;'
        actions: [
          id: '50447afb4728cb2036cf9f10'
          type: 'post_form'
        ,
          id: '50447afb4728cb2036cf9f11'
          type: 'post_to_multi_social_media'
        ,
          id: '50447afb4728cb2036cf9f12'
          type: 'generate_report'
        ]
      ,
        id: '50447afb4728cb2036cf9cb7'
        title: 'Post Final Result and Reward'
        name: 'post_final_result_and_reward'
        desc: 'Post final result and reward'
        created_at: '2013-06-27T00:39:04.602Z'
        updated_at: '2013-06-27T00:39:04.602Z'
        style: 'left: 1420px; top: 183px;'
        actions: [
          id: '50447afb4728cb2036cf9f13'
          type: 'post_info_page'
        ,
          id: '50447afb4728cb2036cf9f14'
          type: 'post_to_multi_social_media'
        ,
          id: '50447afb4728cb2036cf9f15'
          type: 'send_email'
        ,
          id: '50447afb4728cb2036cf9f16'
          type: 'generate_report'
        ]
      ]
      links: [
        id: '50447afb4728cb2036cf9cc0'
        name: '10_days_likes_gte_300'
        prev_node_id: '50447afb4728cb2036cf9cb0'
        next_node_id: '50447afb4728cb2036cf9cb1'
        title: '10 Days & Likes >= 300'
        created_at: '2013-06-27T00:27:31.946Z'
        updated_at: '2013-06-27T00:27:31.946Z'
      ,
        id: '50447afb4728cb2036cf9cc1'
        name: '10_days_likes_lt_300'
        prev_node_id: '50447afb4728cb2036cf9cb0'
        next_node_id: '50447afb4728cb2036cf9cb2'
        title: '10 Days & Likes < 300'
        created_at: '2013-06-27T00:28:58.636Z'
        updated_at: '2013-06-27T00:28:58.636Z'
      ,
        id: '50447afb4728cb2036cf9cc2'
        name: 'post_req_to_retrieve_app'
        prev_node_id: '50447afb4728cb2036cf9cb1'
        next_node_id: '50447afb4728cb2036cf9cb3'
        created_at: '2013-06-27T00:33:01.670Z'
        updated_at: '2013-06-27T00:33:01.670Z'
      ,
        id: '50447afb4728cb2036cf9cc3'
        name: 'post_req_to_retrieve_logo'
        prev_node_id: '50447afb4728cb2036cf9cb1'
        next_node_id: '50447afb4728cb2036cf9cb4'
        created_at: '2013-06-27T00:35:45.912Z'
        updated_at: '2013-06-27T00:35:45.912Z'
      ,
        id: '50447afb4728cb2036cf9cc4'
        name: 'retrieve_app_to_evaluate'
        prev_node_id: '50447afb4728cb2036cf9cb3'
        next_node_id: '50447afb4728cb2036cf9cb5'
        title: '15 Days & > 80% Response'
        created_at: '2013-06-27T00:37:24.163Z'
        updated_at: '2013-06-27T00:37:24.163Z'
      ,
        id: '50447afb4728cb2036cf9cc5'
        name: 'retrieve_logo_to_post_and_vote'
        prev_node_id: '50447afb4728cb2036cf9cb4'
        next_node_id: '50447afb4728cb2036cf9cb6'
        title: '10 Days & Submissions >= 3'
        created_at: '2013-06-27T00:37:43.706Z'
        updated_at: '2013-06-27T00:37:43.706Z'
      ,
        id: '50447afb4728cb2036cf9cc6'
        title: '(fallback)'
        name: 'faild_to_evaluate'
        desc: 'Manual trigger back if failed to evaluate'
        prev_node_id: '50447afb4728cb2036cf9cb5'
        next_node_id: '50447afb4728cb2036cf9cb3'
        created_at: '2013-06-27T00:37:51.943Z'
        updated_at: '2013-06-27T00:37:51.943Z'
      ,
        id: '50447afb4728cb2036cf9cc7'
        title: '(fallback)'
        name: 'failed_to_vote'
        desc: 'Manual trigger back if failed to vote'
        prev_node_id: '50447afb4728cb2036cf9cb6'
        next_node_id: '50447afb4728cb2036cf9cb4'
        created_at: '2013-06-27T00:38:05.360Z'
        updated_at: '2013-06-27T00:38:05.360Z'
      ,
        id: '50447afb4728cb2036cf9cc8'
        name: 'evaluate_to_post_final'
        prev_node_id: '50447afb4728cb2036cf9cb5'
        next_node_id: '50447afb4728cb2036cf9cb7'
        created_at: '2013-06-27T00:39:22.841Z'
        updated_at: '2013-06-27T00:39:22.841Z'
      ,
        id: '50447afb4728cb2036cf9cc9'
        name: 'post_and_vote_to_post_final'
        prev_node_id: '50447afb4728cb2036cf9cb6'
        next_node_id: '50447afb4728cb2036cf9cb7'
        created_at: '2013-06-27T00:39:26.674Z'
        updated_at: '2013-06-27T00:39:26.674Z'
      ]
      created_at: '2013-06-27T00:22:20.272Z'
      updated_at: '2013-06-27T00:22:20.272Z'
    ,
      id: '50447afb4728cb2036cf9ca1'
      name: 'test_wf'
      title: 'Test Workflow'
      desc: 'The test workflow'
      created_at: new Date(1363879373649)
      updated_at: new Date(1363879373649)
      nodes: [
        id: '507f81413d070321728fde10'
        name: 'post_idea'
        title: 'Post Idea'
        desc: 'Post software project ideas'
        workflow_id: '50447afb4728cb2036cf9ca1'
        actions: []
        created_at: new Date(1363879373649)
        updated_at: new Date(1363879373649)
      ,
        id: '507f81413d070321728fde11'
        name: 'post_cancel'
        title: 'Post Cancel'
        desc: 'Post cancel notification'
        workflow_id: '50447afb4728cb2036cf9ca1'
        actions: []
        created_at: new Date(1363879373649)
        updated_at: new Date(1363879373649)
      ,
        id: '507f81413d070321728fde12'
        name: 'post_req'
        title: 'Post Requirement'
        desc: 'Post project requirement'
        workflow_id: '50447afb4728cb2036cf9ca1'
        actions: []
        created_at: new Date(1363879373649)
        updated_at: new Date(1363879373649)
      ,
        id: '507f81413d070321728fde13'
        name: 'submit_design'
        title: 'Submit Design'
        desc: 'Retrieve theme design submissions & e-mail to stackholders'
        workflow_id: '50447afb4728cb2036cf9ca1'
        actions: []
        created_at: new Date(1363879373649)
        updated_at: new Date(1363879373649)
      ,
        id: '507f81413d070321728fde14'
        name: 'notification'
        title: 'Notification'
        desc: 'Notification'
        workflow_id: '50447afb4728cb2036cf9ca1'
        actions: []
        created_at: new Date(1363879373649)
        updated_at: new Date(1363879373649)
      ,
        id: '507f81413d070321728fde15'
        name: 'post_result'
        title: 'Post Result'
        desc: 'Post & e-mail result everyone'
        workflow_id: '50447afb4728cb2036cf9ca1'
        actions: []
        created_at: new Date(1363879373649)
        updated_at: new Date(1363879373649)
      ]
      links: [
        id: '507f81413d070321728fde22'
        name: 'post_req_to_submit_design'
        workflow_id: '50447afb4728cb2036cf9ca1'
        prev_node_id: '507f81413d070321728fde12'
        next_node_id: '507f81413d070321728fde13'
        created_at: new Date(1363879373649)
        updated_at: new Date(1363879373649)
      ,
        id: '507f81413d070321728fde24'
        name: 'pass_to_post'
        desc: 'Post & e-mail to everyone if pass rate > 50%'
        workflow_id: '50447afb4728cb2036cf9ca1'
        prev_node_id: '507f81413d070321728fde13'
        next_node_id: '507f81413d070321728fde15'
        created_at: new Date(1363879373649)
        updated_at: new Date(1363879373649)
      ,
        id: '507f81413d070321728fde20'
        name: 'to_cancel'
        title: 'Like < 300'
        desc: 'Cancel if like count < 300'
        workflow_id: '50447afb4728cb2036cf9ca1'
        prev_node_id: '507f81413d070321728fde10'
        next_node_id: '507f81413d070321728fde11'
        created_at: new Date(1363879373649)
        updated_at: new Date(1363879373649)
      ,
        id: '507f81413d070321728fde21'
        name: 'continue_to_req'
        title: 'Like >= 300'
        desc: 'Continue to post requirement if like count >= 300'
        workflow_id: '50447afb4728cb2036cf9ca1'
        prev_node_id: '507f81413d070321728fde10'
        next_node_id: '507f81413d070321728fde12'
        created_at: new Date(1363879402429)
        updated_at: new Date(1363879402429)
      ,
        id: '507f81413d070321728fde23'
        name: 'not_pass_to_notify'
        title: 'Pass rate <= 50%'
        desc: 'Notification if pass rate <= 50%'
        workflow_id: '50447afb4728cb2036cf9ca1'
        prev_node_id: '507f81413d070321728fde13'
        next_node_id: '507f81413d070321728fde14'
        created_at: new Date(1363879447134)
        updated_at: new Date(1363879447134)
      ]
      node_ids: [
        '507f81413d070321728fde10'
        '507f81413d070321728fde11'
        '507f81413d070321728fde12'
        '507f81413d070321728fde13'
        '507f81413d070321728fde14'
        '507f81413d070321728fde15'
      ]
      link_ids: [
        '507f81413d070321728fde20'
        '507f81413d070321728fde21'
        '507f81413d070321728fde22'
        '507f81413d070321728fde23'
        '507f81413d070321728fde24'
      ]
    ]

    projects: [
      id: '50447afb4728cc2036cf9cf1'
      workflow_id: '50447afb4728cb2036cf9ca1'
      name: 'test_proj'
      title: 'Test Project'
      desc: 'The test project applying the test workflow'
      status: 'RUNNING'
      created_at: new Date(1371363975245)
      updated_at: new Date(1371363975245)
    ]

    contents: [
      id: 'e57bf4f6aad752f9fc37fcf1'
      title: 'SOMY X100 Project Initialization'
      desc: 'SOMY X100 Project Initialization Page'
      media: 'PAGE'
      project:
        id: '50447afb4728cc2036cf9cf1'
        title: 'SOMY X100'
      node:
        id: '507f81413d070321728fde10'
        title: 'Post Idea'
      action:
        id: 'f8e39128e0b51ecb5b1e6e40'
        title: 'Post to Multiple Socal Media'
      url: 'about:blank'
      status: 'POSTED'
      created_at: new Date(1371191307656)
      posted_at: new Date(1371191307656)
    ,
      id: 'e57bf4f6aad752f9fc37fcf2'
      title: 'SOMY X100 Project Initialization'
      desc: 'SOMY X100 Project Initialization Facebook Post'
      media: 'FACEBOOK'
      project:
        id: '50447afb4728cc2036cf9cf1'
        title: 'SOMY X100'
      node:
        id: '507f81413d070321728fde10'
        title: 'Post Idea'
      action:
        id: 'f8e39128e0b51ecb5b1e6e40'
        title: 'Post to Multiple Socal Media'
      url: 'about:blank'
      status: 'POSTED'
      created_at: new Date(1371191307656)
      posted_at: new Date(1371191307656)
    ,
      id: 'e57bf4f6aad752f9fc37fcf3'
      title: 'SOMY X100 Project Initialization'
      desc: 'SOMY X100 Project Initialization Twitter Post'
      media: 'TWITTER'
      project:
        id: '50447afb4728cc2036cf9cf1'
        title: 'SOMY X100'
      node:
        id: '507f81413d070321728fde10'
        title: 'Post Idea'
      action:
        id: 'f8e39128e0b51ecb5b1e6e40'
        title: 'Post to Multiple Socal Media'
      url: 'about:blank'
      status: 'POSTED'
      created_at: new Date(1371191307656)
      posted_at: new Date(1371191307656)
    ,
      id: 'e57bf4f6aad752f9fc37fef1'
      title: 'SOMY X100 Project Notification'
      desc: 'SOMY X100 Project Notification Page'
      media: 'PAGE'
      project:
        id: '50447afb4728cc2036cf9cf1'
        title: 'SOMY X100'
      node:
        id: '507f81413d070321728fde14'
        title: 'Notification'
      action:
        id: 'f8e39128e0b51ecb5b1e6e40'
        title: 'Post to Multiple Socal Media'
      status: 'WAITING'
      created_at: new Date(1371191309656)
    ,
      id: 'e57bf4f6aad752f9fc37fef2'
      title: 'SOMY X100 Project Notification'
      desc: 'SOMY X100 Project Notification Facebook Post'
      media: 'FACEBOOK'
      project:
        id: '50447afb4728cc2036cf9cf1'
        title: 'SOMY X100'
      node:
        id: '507f81413d070321728fde14'
        title: 'Notification'
      action:
        id: 'f8e39128e0b51ecb5b1e6e40'
        title: 'Post to Multiple Socal Media'
      status: 'WAITING'
      created_at: new Date(1371191309656)
    ,
      id: 'e57bf4f6aad752f9fc37fef3'
      title: 'SOMY X100 Project Notification'
      desc: 'SOMY X100 Project Notification Twitter Post'
      media: 'TWITTER'
      project:
        id: '50447afb4728cc2036cf9cf1'
        title: 'SOMY X100'
      node:
        id: '507f81413d070321728fde14'
        title: 'Notification'
      action:
        id: 'f8e39128e0b51ecb5b1e6e40'
        title: 'Post to Multiple Socal Media'
      status: 'WAITING'
      created_at: new Date(1371191309656)
    ,
      id: 'e57bf4f6aad752f9fc37feff'
      title: 'Test Content'
      desc: 'Test Content'
      media: 'TWITTER'
      project:
        id: '51447afb4728cc2036cf9cf1'
        title: 'Test Project'
      node:
        id: '517f81413d070321728fde14'
        title: 'Test Node'
      action:
        id: 'f8e39128e0b51ecb5b1e6e40'
        title: 'Post to Multiple Socal Media'
      status: 'WAITING'
      created_at: new Date(1371191309656)
    ]

    reports: [
      id: 'e57bf4f6aad752f9fc51fef0'
      title: 'Test Report'
      desc: 'Test Report'
      project:
        id: '51447afb4728cc2036cf9cf1'
        title: 'Test Project'
      node:
        id: '517f81413d070321728fde14'
        title: 'Test Node'
      action:
        id: 'f8e39128e0b51ecb5b1e6e40'
        title: 'Post to Multiple Socal Media'
      status: 'COLLECTING'
      created_at: new Date(1373284304000)
      updated_at: new Date(1373284304000)
      ended_at: new Date(1373457155000)
    ]

  exports = {}
  for name, list of data
    name = name.toLowerCase()
    cap = name.charAt(0).toUpperCase() + name[1..]
    throw 'unknown test data name ' + name unless models[cap]
    col = new models[cap]
    list.forEach (r) -> col.create r
    exports[name] = col
  console.log 'test data loaded'
  exports
