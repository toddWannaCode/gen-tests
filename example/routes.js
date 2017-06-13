router.prefix('/upload');
router.post('api:upload:image', '/image', views.image);
router.post('api:upload:file', '/file', views.file);
     